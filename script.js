let articles = [
  { title: "AI Advances", author: "Alice", category: "Tech", views: 150 },
  { title: "Health Tips", author: "Bob", category: "Health", views: 120 },
  { title: "New Gadgets", author: "Alice", category: "Tech", views: 200 },
  { title: "Travel Guide", author: "Charlie", category: "Travel", views: 90 },
  { title: "Fitness Trends", author: "Bob", category: "Health", views: 75 }
];

const infoMessages = {
  totalViews: "Displays total views of all articles combined.",
  filterTech: 'Shows articles only from the "Tech" category.',
  mostViewed: "Finds and shows the article with the highest views.",
  groupByAuthor: "Groups articles and lists them by each author.",
  fetchNew: "Simulates fetching new articles and adds them to the list."
};

function showInfoAndOutput(info, output) {
  const container = document.getElementById('output');
  container.textContent = `Info: ${info}\n\n${output}`;
}

function totalViews() {
  return articles.reduce((sum, a) => sum + a.views, 0);
}

function filterByCategory(category) {
  return articles.filter(a => a.category === category);
}

function mostViewedArticle() {
  return articles.reduce((max, a) => a.views > max.views ? a : max, articles[0]);
}

function groupByAuthor() {
  return articles.reduce((group, a) => {
    if (!group[a.author]) group[a.author] = [];
    group[a.author].push(a);
    return group;
  }, {});
}

function fetchNewArticles() {
  const output = document.getElementById('output');
  output.textContent = `Info: ${infoMessages.fetchNew}\n\nFetching new articles...`;
  setTimeout(() => {
    const newArticles = [
      { title: "Space Exploration", author: "Diana", category: "Science", views: 300 },
      { title: "Healthy Eating", author: "Bob", category: "Health", views: 180 }
    ];
    articles = articles.concat(newArticles);
    output.textContent = `Info: ${infoMessages.fetchNew}\n\nNew articles fetched! Total articles now: ${articles.length}`;
  }, 2000);
}

function showTotalViews() {
  const total = totalViews();
  showInfoAndOutput(infoMessages.totalViews, `Total views across all articles: ${total}`);
}

function showArticlesByCategory(category) {
  const filtered = filterByCategory(category);
  if (filtered.length === 0) {
    showInfoAndOutput(infoMessages.filterTech, `No articles found in category "${category}".`);
  } else {
    const list = filtered.map(a => `- ${a.title} by ${a.author} (${a.views} views)`).join('\n');
    showInfoAndOutput(infoMessages.filterTech, `Articles in category "${category}":\n${list}`);
  }
}

function showMostViewedArticle() {
  const a = mostViewedArticle();
  showInfoAndOutput(infoMessages.mostViewed,
    `Most viewed article:\n${a.title} by ${a.author} (${a.category}) with ${a.views} views`
  );
}

function showArticlesGroupedByAuthor() {
  const grouped = groupByAuthor();
  let text = '';
  for (const author in grouped) {
    text += `${author}:\n`;
    grouped[author].forEach(a => {
      text += `  - ${a.title} (${a.category}, ${a.views} views)\n`;
    });
  }
  showInfoAndOutput(infoMessages.groupByAuthor, text);
}
