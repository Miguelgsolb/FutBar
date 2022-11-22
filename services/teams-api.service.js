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


  getPlayersByTeam = (team) => {
    const params = {
      key: process.env.API_KEY,
      tz: 'Europe/Madrid',
      format: 'json',
      req: 'team_players',
      team: '',
      year: '2022'
    }

    return this.axiosApp.get(`/api.php`, { params })
  }

  "id_comp"


  /*  getOneTeam = (teamId) => {
     return this.axiosApp.get(`/characters/${teamId}`)
    }
 

 
    getOnePlayer = (playerId) => {
      return this.axiosApp.get(`/characters/${playerId}`)
   }*/
}


module.exports = teamsApi
