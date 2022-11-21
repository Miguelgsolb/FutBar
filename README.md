| Route                     | HTTP Verb | Description               | JSON |
| ------------------------- | --------- | ------------------------- | ---- |
| `/`                       | GET       | Index page                |      |
| `/eventos`                | GET       | Events list               |      |
| `/eventos/crear`          | GET       | Create a new event        |      |
| `/eventos/crear`          | POST      | Show the new event        |      |
| `/eventos/:id/editar`     | GET       | Update a specific event   |      |
| `/eventos/:id/editar`     | POST      | Update a specific event   |      |
| `/eventos/:id/delete`     | DELETE    | Delete a specific event   |      |
| `/equipos`                | GET       | List of all teams         | YES  |
| `/equipos/detalles/:id`   | GET       | Details of a team         | YES  |
| `/jugadores`              | GET       | List of players of a team | YES  |
| `/jugadores/detalles/:id` | GET       | Details of a player       | YES  |
| `/perfil`                 | GET       | Profile of the user       |      |
| `/registro `              | GET       | Sign in                   |      |
| `/iniciar-sesion`         | GET       | Log in                    |      |
| `/cerrar-sesion`          | GET       | Log out                   |      |
