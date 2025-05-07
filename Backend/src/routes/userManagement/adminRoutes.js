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
import DeactivateUser from '../../controllers/userManagement/DeactivateAccount.js'
import ReactivateUsers from '../../controllers/userManagement/ReactivateAccounts.js'
import UserRegistrationReport from '../../controllers/userManagement/reports/UserRegistrationReport.js'
import { getAllActivities } from '../../controllers/userManagement/LogActivity.js'
import { generateLoginReport } from '../../controllers/userManagement/reports/SystemLoginActivityReport.js'
import { generateBidReport } from '../../controllers/userManagement/reports/BiddingSuccessReport.js'
import { createSystemBackup, listBackups } from '../../controllers/userManagement/backup/Backup.js'
import { closeConversation, getAdminConversations, getConversations, getMessages, joinConversation, sendMessage, sendUserMessage } from '../../controllers/userManagement/chat/Chat.js'


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

router.post("/deactivate", DeactivateUser)
router.post("/reactivate", ReactivateUsers)

router.get("/report/user-registration", UserRegistrationReport)
router.get('/report/login-activities', generateLoginReport);
router.get('/report/bidding', generateBidReport);

router.get("/activity", getAllActivities)
router.get("/backup", listBackups)
router.post("/backup", createSystemBackup)

router.get("/convo", getConversations)
router.get("/convo/admin", getAdminConversations)
router.post("/convo/join", joinConversation)
router.get("/convo/messages/:conversationId", getMessages)
router.post("/convo/close", closeConversation)
router.post("/convo/send", sendMessage)
router.post("/convo/send/user", sendUserMessage);

export default router