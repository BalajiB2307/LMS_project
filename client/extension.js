module.exports = {
    // name: 'ExperienceDemoBalaji',
    // publisher: 'Sample',
    name: 'Library Management',
    publisher: 'Ellucian',
    cards: [
        {
            // type: 'ExperienceDemoCardBalaji',
            // source: './src/cards/ExperienceDemoCardBalaji',
            // title: 'Experience Balaji Card',
            // displayCardType: 'Experience Balaji Card',
            // description: 'Experience Balaji Demo',
            type: 'LibraryManagement',
            source: './src/cards/LibraryManagement',
            title: 'Library Management',
            displayCardType: 'Library Management System',
            description: 'card for Library Management System',
            pageRoute: {
                route: '/',
                excludeClickSelectors: ['a']
            }
        }
    ],
    page: {
        source: './src/page/router.tsx',
        fullWidth: true
    }
};
