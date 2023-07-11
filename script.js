const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

// Focuses on the textarea when the page has loaded
textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);
  // When the enter key is hit, begin the random selection
  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = '';
    }, 10);
    randomSelect();
  }
});

function createTags(input) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '') // To filter the empty elements out
    .map((tag) => tag.trim()); // To trim the elements who begin or end with a space

  tagsEl.innerHTML = '';
  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl); // Adding what the user has typed into seperated elements
  });
}

function randomSelect() {
  const times = 30; // How many times will the rolling take

  const interval = setInterval(() => {
    const randomTag = pickRandomTag(); // Pick a random tag, highlight it and unhighlight it every 100ms
    highlightTag(randomTag);
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  // After times * 100ms clear the interval so no element is highlighted, and select the final element that is picked
  // To increass the rolling time, increase the 'time' variable
  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

// Picks a random tag from the added elements to the HTML
function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}
