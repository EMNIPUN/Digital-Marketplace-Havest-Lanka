import express from 'express'
import ServerInfo from '../../controllers/userManagement/fetch/ServerInfo.js'
import PieChartData from '../../controllers/userManagement/fetch/PieChartData.js'
import { getSystemLoad } from '../../controllers/userManagement/fetch/SystemLoad.js'
import CriticalAlerts from '../../controllers/userManagement/CriticalAlerts.js'
import CheckCriticalAlerts from '../../controllers/userManagement/fetch/CheckCriticalAlerts.js'
import addMultipleAlertsByUrl from '../../controllers/userManagement/test/ManualAlerts.js'
import AddBroadcast from '../../controllers/userManagement/AddBroadcast.js'
import GetBroadcast from '../../controllers/userManagement/fetch/GetBroadcast.js'
import GetAllAccounts from '../../controllers/userManagement/fetch/GetAllAccounts.js'
import GetActiveSessions from '../../controllers/userManagement/fetch/GetActiveSessions.js'

const router = express.Router()

router.get("/server", ServerInfo)
router.get("/piechartdata", PieChartData)
router.get("/sysload", getSystemLoad)
router.get("/critical-alerts", CriticalAlerts)
router.post("/critical-alerts-seen", CheckCriticalAlerts)
router.post("/broadcast/add", AddBroadcast)
router.get("/broadcast/get", GetBroadcast)
router.get("/getallaccounts", GetAllAccounts)
router.get("/getactivesessions", GetActiveSessions)

router.get("/test/manual-alerts", addMultipleAlertsByUrl)

export default router