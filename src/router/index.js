import { createRouter, createWebHistory } from 'vue-router'
import Servers from '../views/Servers.vue'
import Players from '../views/Players.vue'
import PlayerDetails from '../views/PlayerDetails.vue'
import ServerDetails from '../views/ServerDetails.vue'
import ServerRankingsPage from '../components/ServerRankingsPage.vue'
import PlayerSessionsPage from '../components/PlayerSessionsPage.vue'
import RoundReportPage from '../components/RoundReportPage.vue'
import TKLivewirePage from '../components/TKLivewirePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/servers/bf1942'
    },
    {
      path: '/servers',
      name: 'servers',
      redirect: '/servers/bf1942'
    },
    {
      path: '/servers/bf1942',
      name: 'servers-bf1942',
      component: Servers,
      props: { initialMode: '42' }
    },
    {
      path: '/servers/fh2',
      name: 'servers-fh2',
      component: Servers,
      props: { initialMode: 'FH2' }
    },
    {
      path: '/servers/:serverName',
      name: 'server-details',
      component: ServerDetails,
      props: true
    },
    {
      path: '/servers/:serverName/rankings',
      name: 'server-rankings',
      component: ServerRankingsPage,
      props: true
    },
    {
      path: '/players',
      name: 'players',
      component: Players
    },
    {
      path: '/players/:playerName',
      name: 'player-details',
      component: PlayerDetails,
      props: true
    },
    {
      path: '/players/:playerName/sessions',
      name: 'player-sessions',
      component: PlayerSessionsPage,
      props: true
    },
    {
      path: '/servers/round-report',
      name: 'round-report',
      component: RoundReportPage,
      props: route => ({
        serverGuid: route.query.serverGuid,
        mapName: route.query.mapName,
        startTime: route.query.startTime
      })
    },
    {
      path: '/tk-livewire',
      name: 'tk-livewire',
      component: TKLivewirePage
    }
  ]
})

export default router
