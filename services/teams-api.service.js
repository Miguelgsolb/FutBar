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

  /*  getOneTeam = (teamId) => {
     return this.axiosApp.get(`/characters/${teamId}`)
    }
 
    getAllPlayers = () => {
     return this.axiosApp.get("/characters")
   }
 
    getOnePlayer = (playerId) => {
      return this.axiosApp.get(`/characters/${playerId}`)
   }*/
}


module.exports = teamsApi
