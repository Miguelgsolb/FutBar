const axios = require("axios")

class teamsApi {

  constructor() {

    this.axiosApp = axios.create({
      baseURL: `https://apiclient.besoccerapps.com/scripts/api`,
    })
  }


  getAllTeams = () => {
    const params = {
      key: process.env.API_KEY,
      tz: 'Europe/Madrid',
      format: 'json',
      req: 'teams',
      league: '1',
      year: '2023'
    }

    return this.axiosApp.get(`/api.php`, { params })
  }


  getPlayersByTeam = (id_comp) => {
    const params = {
      key: process.env.API_KEY,
      tz: 'Europe/Madrid',
      format: 'json',
      req: 'team_players',
      team: `${id_comp}`,
      year: '2023'
    }

    return this.axiosApp.get(`/api.php`, { params })
  }

  getAllInfo = () => {
    const params = {
      key: process.env.API_KEY,
      tz: 'Europe/Madrid',
      format: 'json',
      req: 'matchs',
      league: '1',
      round: '14',
      order: 'twin',
      twolegged: '1',
      year: '2023'
    }

    return this.axiosApp.get(`/api.php`, { params })
  }

  getClassification = () => {
    const params = {
      key: process.env.API_KEY,
      year: '2023',
      tz: 'Europe/Madrid',
      format: 'json',
      req: 'tables',
      league: '1',
      group: '1',
      round: '14'
    }

    return this.axiosApp.get(`/api.php`, { params })
  }

}


module.exports = teamsApi

