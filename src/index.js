import {Router} from '@core/routes/router'
import {DashboardPage} from './pages/dashboardPage'
import {ExcelPage} from './pages/ExcelPage'
import './scss/index.scss'

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage,
})