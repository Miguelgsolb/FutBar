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
      year: '2022'
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
      year: '2022'
    }

    return this.axiosApp.get(`/api.php`, { params })
  }


  /*   getOnePlayer = (id) => {
      const params = {
        key: process.env.API_KEY,
        tz: 'Europe/Madrid',
        format: 'json',
        req: 'team_players',
        team: `${id_comp}`,
        year: '2022'
      }
      return this.axiosApp.get(`/api.php`, { params })
    } */

  /*  getOneTeam = (teamId) => {
     return this.axiosApp.get(`/characters/${teamId}`)
    }
 


   }*/
}


module.exports = teamsApi
