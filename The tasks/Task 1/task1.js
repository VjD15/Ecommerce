function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();

  function dfs(r, c) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      grid[r][c] === "0" ||
      visited.has(`${r},${c}`)
    )
      return;

    visited.add(`${r},${c}`);
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1" && !visited.has(`${r},${c}`)) {
        dfs(r, c);
        count++;
      }
    }
  }

  return count;
}

// Example
const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];

console.log("Number of Islands:", numIslands(grid)); // Output: 3
