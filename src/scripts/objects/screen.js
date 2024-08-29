const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuario" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada'}</p> <br/>
                                <p>👥followers: ${user.followers ?? 'Não possui nenhum seguidor'}</p>
                                <p>👤following: ${user.following ?? 'Não possui nenhum seguidor'}</p>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                                                         <div class="languages">
                                                                            <p class="style">
                                                                                🍴${repo.forks}
                                                                            </p>    
                                                                                
                                                                            <p class="style">
                                                                            🌟${repo.stargazers_count}
                                                                            </p>
                                                                            
                                                                            <p class="style">
                                                                            👀${repo.watchers}
                                                                            </p>

                                                                            <p class="style">
                                                                            👨‍💻${repo.language ?? "Does not have a language"}
                                                                            </p>
                                                                        </div> 
                                                                    </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositories</h2>
                                                <ul>${repositoriesItens}</ul>
                                                </div>`
        }







        let eventsList = user.events.filter(
            event => event.type === "PushEvent" || event.type === "CreateEvent"
        );

        let displayEvents = "";

        eventsList.forEach(event => {
            let eventName = '';
            let messageEvent = '';

            if (event.type === "PushEvent") {
                eventName = event.repo.name;
                messageEvent = event.payload.commits[0].message;
            } else if (event.type === "CreateEvent") {
                eventName = event.repo.name;
                messageEvent = "No commits"
            } else {
                return
            }
            displayEvents += `<li><a href="https://github.com/${eventName}" target="_blank"> ${eventName}</a> - ${messageEvent}</li>`;

        });

        this.userProfile.innerHTML += `<div class="events">
                                             <h2 class="tittle-events">Eventos</h2>
                                             <ul>${displayEvents}</ul>
                                        </div>`;

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>User not found.</h3>"
    }
}

export { screen }