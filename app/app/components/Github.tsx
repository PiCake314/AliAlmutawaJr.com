type GithubData = {
    login: string,
    public_repos: number,
    followers: number,
}

type GithubRepo = {
    name: string,
    description: string,
    html_url: string
    language: string,
}

const GithubRepoLanguagesToColor: {[key: string]: string} = {
    "TypeScript": "#3178c6",
    "Jupyter Notebook": "#DA5B0B",
    "Go": "#00ADD8",
    "Python": "#3572A5",
    "JavaScript": "#F1E05A",
    "CSS": "#563D7C",
    "HTML": "#e34c26",
    "C": "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    "Java": "#b07219",
    "Scala": "#c22d40",
    "Dart": "#00B4AB"
}
    


async function getGithubData(): Promise<GithubData> {
    const res = await fetch('https://api.github.com/users/PiCake314')
    const data: GithubData = await res.json()
    return data
}

async function getGithubRepos(): Promise<GithubRepo[]> {
    const res = await fetch('https://api.github.com/users/PiCake314/repos')
    const data: GithubRepo[] = await res.json()
    return data
}

export default async function Github() {
    const githubData: GithubData = await getGithubData()
    const githubRepos: GithubRepo[] = await getGithubRepos()

    githubRepos.sort(() => Math.random() - 0.5) // Looks weird but it shuffles the array


    return (
        <div className="lg:w-[50%] mx-auto py-5 leading-loose">
            
            <h2 className="text-center text-2xl">My Github Summary</h2>

            <div className="grid col-span-1 justify-center">
                <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                    <a href="https://github.com/NicholasHellmers" target="_blank"><p>User: {githubData.login}</p></a>
                    <p>Public Repos: {githubData.public_repos}</p>
                    <p>Followers: {githubData.followers}</p>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-5">
                    {/* Limit the github repos to load 4 */}
                    {githubRepos.slice(0, 6).map((repo) => (
                        <li className="flex flex-col border rounded-md p-4 text-ellipsis overflow-hidden relative" key={repo.name}>
                            <h4><a href={repo.html_url} target="_blank">{repo.name}</a></h4>
                            <p className="flex-auto w-[100%] py-3 text-sm font-light text-gray-300">{repo.description}</p>
                            <div className="flex gap-2">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: GithubRepoLanguagesToColor[repo.language]}}></div>
                                </div>
                                <p className="text-sm font-light text-gray-300">{repo.language}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="text-center">

                <a href="https://github.com/NicholasHellmers?tab=repositories" target="_blank">Click Here to see more</a>

            </div>

        </div>
    )
}
