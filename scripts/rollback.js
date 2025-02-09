const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Отримуємо список всіх тегів
const getTags = () => {
  try {
    return execSync('git tag --sort=-v:refname')
      .toString()
      .split('\n')
      .filter(Boolean);
  } catch (error) {
    console.error('Error getting tags:', error.message);
    return [];
  }
};

// Головна функція
const main = async () => {
  const tags = getTags();
  
  if (tags.length === 0) {
    console.log('No versions found. Create a version first with npm run save:tag');
    rl.close();
    return;
  }

  console.log('\nAvailable versions:');
  tags.forEach((tag, index) => {
    console.log(`${index + 1}. ${tag}`);
  });

  rl.question('\nEnter the number of the version to rollback to (or "q" to quit): ', (answer) => {
    if (answer.toLowerCase() === 'q') {
      console.log('Operation cancelled');
      rl.close();
      return;
    }

    const selectedIndex = parseInt(answer) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= tags.length) {
      console.log('Invalid selection');
      rl.close();
      return;
    }

    const selectedTag = tags[selectedIndex];
    
    try {
      // Зберігаємо поточні зміни
      execSync('git add .');
      execSync('git commit -m "Auto-save before rollback"');
      
      // Відкочуємося до вибраної версії
      execSync(`git checkout ${selectedTag}`);
      
      console.log(`\nSuccessfully rolled back to version ${selectedTag}`);
      console.log('Run npm install to update dependencies');
      console.log('\nTo return to the latest version:');
      console.log('git checkout main');
      console.log('npm install');
    } catch (error) {
      console.error('Error during rollback:', error.message);
    }

    rl.close();
  });
};

main();