const getGithubRepositories = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "GitHub username is required",
      });
    }

    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(
        username
      )}/repos?sort=updated&per_page=20`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({
          success: false,
          message: "GitHub user not found",
        });
      }

      return res.status(response.status).json({
        success: false,
        message: "Unable to fetch GitHub repositories",
      });
    }

    const repositories = await response.json();

    const formattedRepositories = repositories.map(
      (repo) => ({
        name: repo.name,
        description:
          repo.description || "No description available",
        language: repo.language || "Not specified",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updatedAt: repo.updated_at,
      })
    );

    res.status(200).json({
      success: true,
      username,
      totalRepositories: formattedRepositories.length,
      repositories: formattedRepositories,
    });
  } catch (error) {
    console.error(
      "GitHub integration error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to connect with GitHub",
    });
  }
};

module.exports = {
  getGithubRepositories,
};