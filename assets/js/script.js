/* MENU */
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuList = document.getElementById("menu-list");
    const mainContent = document.getElementById("container");

    menuToggle?.addEventListener("click", () => {
        menuList.classList.toggle("active");
        mainContent.classList.toggle("shifted");
    });

    const currentPage = window.location.pathname;

    if (currentPage.includes("index.html")) {
        loadPaginatedCharacters(1);
        setupFilters();
        setupSearch();
    } else if (currentPage.includes("episodes.html")) {
        loadEpisodes(1);
        setupEpisodeFilters();
    } else if (currentPage.includes("location.html")) {
        loadLocations(1);
        setupLocationFilters();
    }
});

const urlCharacters = 'https://rickandmortyapi.com/api/character';
const urlEpisodes = 'https://rickandmortyapi.com/api/episode/';
const urlLocations = 'https://rickandmortyapi.com/api/location/';

function charactersRNM(data) {
    const div = document.createElement('div');
    const charactersContainer = document.getElementById('character-cards');
    div.classList.add('character-card');

    div.innerHTML = `
        <img src="${data.image}" alt="${data.name}">
        <h2>${data.name}</h2>
        <p><b>Last known location:</b> ${data.location.name}</p>
    `;

    const statusBadge = document.createElement('div');
    statusBadge.classList.add('btnsCard');
    statusBadge.textContent = data.status.toUpperCase();
    statusBadge.classList.add(data.status.toLowerCase());

    const genderBadge = document.createElement('div');
    genderBadge.classList.add('gender');

    if (data.gender === "Female") {
        genderBadge.classList.add('female');
        genderBadge.innerHTML = `<i class="fa-solid fa-venus"></i>`;
    } else if (data.gender === "Male") {
        genderBadge.classList.add('male');
        genderBadge.innerHTML = `<i class="fa-solid fa-mars"></i>`;
    } else if (data.gender === "Genderless") {
        genderBadge.classList.add('genderless');
        genderBadge.innerHTML = `<i class="fa-solid fa-genderless"></i>`;
    } else {
        genderBadge.classList.add('unknown-g');
        genderBadge.innerHTML = `<i class="fa-solid fa-question"></i>`;
    }

    div.appendChild(statusBadge);
    div.appendChild(genderBadge);
    charactersContainer.appendChild(div);
}

function buildPagination(info, loadFunc) {
    const paginationContainer = document.querySelector('#pagination ul');
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    const currentPage = parseInt(info.next ? new URL(info.next).searchParams.get('page') - 1 : info.pages);
    const totalPages = info.pages;

    const createButton = (label, disabled, onClick) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = 'btnPagination';
        btn.disabled = disabled;
        btn.addEventListener('click', onClick);
        li.appendChild(btn);
        return li;
    };

    paginationContainer.appendChild(
        createButton('Prev', !info.prev, () => loadFunc(currentPage - 1))
    );

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 3);
    for (let i = startPage; i <= endPage; i++) {
        const li = createButton(i, false, () => loadFunc(i));
        if (i === currentPage) li.querySelector('button').style.backgroundColor = '#00B5CC';
        paginationContainer.appendChild(li);
    }

    paginationContainer.appendChild(
        createButton('Next', !info.next, () => loadFunc(currentPage + 1))
    );
}

function loadPaginatedCharacters(page) {
    fetch(`${urlCharacters}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('character-cards');
            container.innerHTML = '';
            data.results.slice(0, 20).forEach(charactersRNM);
            buildPagination(data.info, loadPaginatedCharacters);
        });
}

function loadEpisodes(page) {
    fetch(`${urlEpisodes}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('character-cards');
            container.innerHTML = '';
            const h1 = document.querySelector('h1');
            h1.textContent = `Episodes Page: ${page}`;
            data.results.forEach(episode => {
                episode.characters.slice(0, 20).forEach(url => {
                    fetch(url)
                        .then(res => res.json())
                        .then(char => charactersRNM(char));
                });
            });
            buildPagination(data.info, loadEpisodes);
        });
}

function loadLocations(page) {
    fetch(`${urlLocations}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('character-cards');
            container.innerHTML = '';
            const h1 = document.querySelector('h1');
            h1.textContent = `Locations Page: ${page}`;
            data.results.forEach(location => {
                location.residents.slice(0, 20).forEach(url => {
                    fetch(url)
                        .then(res => res.json())
                        .then(char => charactersRNM(char));
                });
            });
            buildPagination(data.info, loadLocations);
        });
}

function setupSearch() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input').value.trim();
        if (searchInput) {
            const searchUrl = `${urlCharacters}?name=${searchInput}`;
            fetch(searchUrl)
                .then(response => response.json())
                .then(data => {
                    const charactersContainer = document.getElementById('character-cards');
                    charactersContainer.innerHTML = '';
                    data.results.forEach(charactersRNM);
                });
        }
    });
}

function setupFilters() {
    const filterStatus = document.querySelectorAll('.btnFilterStatus');
    const filterSpecies = document.querySelectorAll('.btnFilterSpecies');
    const filterGender = document.querySelectorAll('.btnFilterGender');

    filterStatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.id;
            fetch(`${urlCharacters}?status=${status}`)
                .then(response => response.json())
                .then(data => {
                    const charactersContainer = document.getElementById('character-cards');
                    charactersContainer.innerHTML = '';
                    data.results.forEach(charactersRNM);
                });
        });
    });

    filterSpecies.forEach(button => {
        button.addEventListener('click', () => {
            const species = button.id;
            fetch(`${urlCharacters}?species=${species}`)
                .then(response => response.json())
                .then(data => {
                    const charactersContainer = document.getElementById('character-cards');
                    charactersContainer.innerHTML = '';
                    data.results.forEach(charactersRNM);
                });
        });
    });

    filterGender.forEach(button => {
        button.addEventListener('click', () => {
            const gender = button.id;
            const genderKey = gender === 'unknown-gender' ? 'unknown' : gender;
            fetch(`${urlCharacters}?gender=${genderKey}`)
                .then(response => response.json())
                .then(data => {
                    const charactersContainer = document.getElementById('character-cards');
                    charactersContainer.innerHTML = '';
                    data.results.forEach(charactersRNM);
                });
        });
    });
}

function setupEpisodeFilters() {
    const filterEpisodes = document.querySelectorAll('.btnFilterE');
    filterEpisodes.forEach(button => {
        button.addEventListener('click', () => {
            const episodes = button.id;
            const filterUrlEP = `${urlEpisodes}${episodes}`;

            fetch(filterUrlEP)
                .then(response => response.json())
                .then(data => {
                    const titleEp = document.querySelector('h1');
                    titleEp.textContent = `Episode name: ${data.name}`;

                    const charactersContainer = document.getElementById('character-cards');
                    charactersContainer.innerHTML = '';

                    data.characters.slice(0, 20).forEach(characterUrl => {
                        fetch(characterUrl)
                            .then(response => response.json())
                            .then(characterData => charactersRNM(characterData));
                    });
                });
        });
    });
}

function setupLocationFilters() {
    const filterLocations = document.querySelectorAll('.btnFilterL');
    filterLocations.forEach(button => {
        button.addEventListener('click', () => {
            const locations = button.id;
            const filterUrlLOC = `${urlLocations}${locations}`;

            fetch(filterUrlLOC)
                .then(response => response.json())
                .then(data => {
                    const titleLoc = document.querySelector('h1');
                    titleLoc.textContent = `Location name: ${data.name}`;

                    const charactersContainer = document.getElementById('character-cards');
                    charactersContainer.innerHTML = '';

                    data.residents.slice(0, 20).forEach(residentUrl => {
                        fetch(residentUrl)
                            .then(response => response.json())
                            .then(characterData => charactersRNM(characterData));
                    });
                });
        });
    });
}