import json
import os

backend_path = 'security-audit/reports/dependency-check/backend-audit.json'
frontend_path = 'security-audit/reports/dependency-check/frontend-audit.json'

with open(backend_path, 'r', encoding='utf-8-sig') as f:
    b_data = json.load(f)

with open(frontend_path, 'r', encoding='utf-8-sig') as f:
    f_data = json.load(f)

def extract_vulns(data, scope):
    items = []
    vulns = data.get('vulnerabilities', {})
    for pkg_name, details in vulns.items():
        severity = details.get('severity', 'unknown')
        via_list = details.get('via', [])
        is_direct = details.get('isDirect', False)
        fix_available = details.get('fixAvailable', False)
        
        for via in via_list:
            if isinstance(via, dict):
                title = via.get('title', 'Unknown issue')
                url = via.get('url', '')
                cwe = ', '.join(via.get('cwe', []))
                cvss = via.get('cvss', {}).get('score', 'N/A')
                items.append({
                    'scope': scope,
                    'package': pkg_name,
                    'severity': via.get('severity', severity).upper(),
                    'title': title,
                    'url': url,
                    'cwe': cwe,
                    'cvss': cvss,
                    'range': via.get('range', ''),
                    'fix': 'Fix Available' if fix_available else 'Manual Upgrade'
                })
            elif isinstance(via, str):
                items.append({
                    'scope': scope,
                    'package': pkg_name,
                    'severity': severity.upper(),
                    'title': f'Transitive vulnerability via dependency {via}',
                    'url': '',
                    'cwe': '',
                    'cvss': 'N/A',
                    'range': details.get('range', ''),
                    'fix': 'Fix Available' if fix_available else 'Manual Upgrade'
                })
    return items

b_items = extract_vulns(b_data, 'Backend')
f_items = extract_vulns(f_data, 'Frontend')
all_items = b_items + f_items

b_meta = b_data.get('metadata', {}).get('vulnerabilities', {})
f_meta = f_data.get('metadata', {}).get('vulnerabilities', {})

total_all = b_meta.get('total', 0) + f_meta.get('total', 0)
critical_all = b_meta.get('critical', 0) + f_meta.get('critical', 0)
high_all = b_meta.get('high', 0) + f_meta.get('high', 0)
mod_all = b_meta.get('moderate', 0) + f_meta.get('moderate', 0)
low_all = b_meta.get('low', 0) + f_meta.get('low', 0)

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OWASP Software Composition Analysis (SCA) Report - Harvest Lanka</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #0b1120;
            color: #f1f5f9;
            margin: 0;
            padding: 30px;
        }}
        .container {{
            max-width: 1350px;
            margin: 0 auto;
        }}
        .header {{
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 28px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }}
        .header h1 {{
            margin: 0 0 10px 0;
            color: #38bdf8;
            font-size: 28px;
        }}
        .header p {{
            margin: 5px 0;
            color: #94a3b8;
            font-size: 14px;
        }}
        .metrics-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 26px;
        }}
        .metric-card {{
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }}
        .metric-card .title {{
            font-size: 13px;
            color: #94a3b8;
            text-transform: uppercase;
            font-weight: 600;
        }}
        .metric-card .count {{
            font-size: 36px;
            font-weight: 800;
            margin-top: 8px;
        }}
        .metric-card.total .count {{ color: #a855f7; }}
        .metric-card.critical .count {{ color: #f43f5e; }}
        .metric-card.high .count {{ color: #fb923c; }}
        .metric-card.moderate .count {{ color: #facc15; }}
        .metric-card.low .count {{ color: #38bdf8; }}
        .table-card {{
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            text-align: left;
        }}
        th {{
            background: #0f172a;
            color: #94a3b8;
            padding: 14px 18px;
            border-bottom: 1px solid #334155;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }}
        td {{
            padding: 14px 18px;
            border-bottom: 1px solid #243247;
            color: #cbd5e1;
            vertical-align: middle;
        }}
        tr:hover td {{
            background: #243247;
        }}
        .badge {{
            display: inline-block;
            padding: 4px 10px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }}
        .badge.critical {{ background: rgba(244, 63, 94, 0.2); color: #fda4af; border: 1px solid #f43f5e; }}
        .badge.high {{ background: rgba(251, 146, 60, 0.2); color: #fed7aa; border: 1px solid #fb923c; }}
        .badge.moderate {{ background: rgba(250, 204, 21, 0.2); color: #fef08a; border: 1px solid #facc15; }}
        .badge.low {{ background: rgba(56, 189, 248, 0.2); color: #bae6fd; border: 1px solid #38bdf8; }}
        .scope-badge {{
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            background: #334155;
            color: #e2e8f0;
        }}
        a {{
            color: #38bdf8;
            text-decoration: none;
            font-weight: 600;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        code {{
            background: #0f172a;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: monospace;
            color: #f1f5f9;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ OWASP Dependency-Check & Software Composition Analysis Report</h1>
            <p><strong>Project:</strong> Harvest Lanka (Digital Marketplace for Farmers and Sellers)</p>
            <p><strong>Academic Course:</strong> SE4030 – Secure Software Development (SLIIT)</p>
            <p><strong>Standard Reference:</strong> OWASP Top 10:2021 – Category A06: Vulnerable and Outdated Components</p>
            <p><strong>Total Scanned Packages:</strong> Backend ({b_data.get('metadata', {}).get('dependencies', {}).get('total', 'N/A')}) + Frontend ({f_data.get('metadata', {}).get('dependencies', {}).get('total', 'N/A')})</p>
        </div>

        <div class="metrics-grid">
            <div class="metric-card total"><div class="title">Total Vulnerabilities</div><div class="count">{total_all}</div></div>
            <div class="metric-card critical"><div class="title">Critical Severity</div><div class="count">{critical_all}</div></div>
            <div class="metric-card high"><div class="title">High Severity</div><div class="count">{high_all}</div></div>
            <div class="metric-card moderate"><div class="title">Moderate Severity</div><div class="count">{mod_all}</div></div>
            <div class="metric-card low"><div class="title">Low Severity</div><div class="count">{low_all}</div></div>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>Scope</th>
                        <th>Severity</th>
                        <th>Vulnerable Package</th>
                        <th>Affected Version</th>
                        <th>Vulnerability Description & Impact</th>
                        <th>Advisory</th>
                    </tr>
                </thead>
                <tbody>
"""

for it in all_items:
    sev_lower = it['severity'].lower()
    link_html = f"<a href='{it['url']}' target='_blank'>Advisory ↗</a>" if it['url'] else "-"
    html += f"""
                    <tr>
                        <td><span class="scope-badge">{it['scope']}</span></td>
                        <td><span class="badge {sev_lower}">{it['severity']}</span></td>
                        <td><strong>{it['package']}</strong></td>
                        <td><code>{it['range']}</code></td>
                        <td>{it['title']}</td>
                        <td>{link_html}</td>
                    </tr>
    """

html += """
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
"""

output_html_path = 'security-audit/reports/dependency-check/dependency-check-report.html'
with open(output_html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Report generated successfully at: {output_html_path}")
