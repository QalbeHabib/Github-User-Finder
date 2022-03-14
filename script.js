const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
// getApiUrl("qalbehabib");

// GEtting Dat from API

async function getApiUrl(username) {
  try {
    const { data } = await axios(APIURL + username);
    displayUserCard(data);
    gettingUserRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorMessage(" No Profile with this usernme");
    }
  }
}

//  Displaying ERROR Messege to Screen

function createErrorMessage(msg) {
  const userCard = `
  <div class="card">
  <h1>${msg}</h1></div>`;

  main.innerHTML = userCard;
}

async function gettingUserRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");
    addReposToCard(data);
    console.log(data);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorMessage(" Problem In Fetching Reopsitory");
    }
  }
}

// Adding Repository the user card

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.forEach((repo) => {
    const repoLink = document.createElement("a");
    repoLink.classList.add("repos");
    repoLink.href = repo.html_url;
    repoLink.target = "_blank";
    repoLink.innerText = repo.name;

    reposEl.appendChild(repoLink);
  });
}
// Displayig Data to Scerrn
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getApiUrl(user);

    search.value = "";
  }
});

function displayUserCard(user) {
  const userCard = `  <div class="main" id="main">
            <div class="card">
                <div>
                    <img src="${user.avatar_url}" class="avatar" alt="${user.name}" />
                </div>


                <div class="user-info">

                    <h2>${user.name}</h2>
                    <p>
                        ${user.bio}
                    </p>

                    <ul>
                        <li>${user.followers} <strong>Followers</strong></li>
                        <li>${user.following} <strong>Following</strong></li>
                        <li>${user.public_repos} <strong>Repository</strong></li>
                    </ul>

                    <div id="repos" class="repos">
                       
                    </div>


                </div>


            </div>
        </div>`;

  main.innerHTML = userCard;
}
