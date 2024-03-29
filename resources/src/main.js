import '../styles/sass/main.scss';

let frameworks = [
    {
        type: 'vue', selector: '#go-vue', script: './vue/vue-index.js'
    },
    {
        type: 'react', selector: '#go-react', script: './react/react-index.js'
    }    
];

// Trigger Vue.js || React.js using the CTAs (first load)
if (!sessionStorage.getItem('sessionData')) {
    // Show welcome page
    document.querySelector('.welcome-screen').classList.add('firstLoad');
    // Add click event for CTAs
    frameworks.forEach(framework => {
        document.querySelector(`${framework.selector}`).addEventListener('click', () => {
            // Reveal overlay with loader
            document.querySelector('.overlay').classList.add('reveal');
            // Reduce welcome page's opacity
            document.querySelector('.welcome-screen').classList.add('loading');
            // Import the script
            import(
                `${framework.script}`
            );
            // Reveal vue.js || react.js wrapper
            document.querySelector(`.offcanvas.${framework.type}`).classList.add('reveal');
            // Hide overlay + main wrapper
            setTimeout(() => {
                document.querySelector('.welcome-screen').classList.add('goOffCanvas');
                document.querySelector('.overlay').classList.add('goOffCanvas');    
            }, 500);
            setTimeout(() => {
                // Make the vue.js || react.js wrapper absolute
                document.querySelector(`.offcanvas.${framework.type}`).classList.add('makeAbsolute');
                // Hide welcome element
                document.querySelector('.welcome-screen').classList.add('hide');
            }, 2500);
        });
    });
}

// Trigger Vue.js || React.js (refresh)
if (sessionStorage.getItem('sessionData')) {
    try {
        // If the user has selected a framework before refresh
        // check the session data, to load the right framework
        let data = JSON.parse(sessionStorage.getItem('sessionData'));
        frameworks
        .filter(framework => framework.type === data.used)
        .map(selectedFramework => { 
            import(`${selectedFramework.script}`)
            // Hide main wrapper
            document.querySelector('.welcome-screen').classList.add('goOffCanvas');
            // Make the vue.js || react.js wrapper absolute
            document.querySelector(`.offcanvas.${selectedFramework.type}`).classList.add('makeAbsolute');
            // Hide welcome element
            document.querySelector('.welcome-screen').classList.add('hide');
        })
    } catch(e) {
        sessionStorage.removeItem('sessionData');
    }
}