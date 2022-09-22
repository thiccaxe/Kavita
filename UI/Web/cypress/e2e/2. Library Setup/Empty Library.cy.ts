describe('Empty Library', () => {

    const libraryName = 'Cypress_Empty';
    let testDirectory = '';
    let libraryPaths: {manga: string, book: string, comic: string, empty: string};

    beforeEach(()=>{
        if (testDirectory != '') return;
        cy.request('http://localhost:5000/api/test/test-data-dir').then((response) => {
          testDirectory = response.body;
          libraryPaths = {
            manga: testDirectory + '/Manga/',
            book: testDirectory + '/Books/',
            comic: testDirectory + '/Comics/',
            empty: testDirectory + '/Empty/',
          };
        });
    });

    it('Ensure we are logged in', () => {
        cy.login();
        // cy.visit('/admin/dashboard').then(() => {
        //     cy.url().then(url => {
        //         if (url.includes('login')) {
        //             cy.login();
        //         }
        //     });
        // });
    });

    it('Create an empty library', () => {
        cy.get('.not-xs-only > .dark-exempt').click()
        cy.contains('Libraries').click()
        cy.contains('Add Library').click()
    
        cy.get('#library-name').type(libraryName)
        cy.get('#library-type').select('Book')
        cy.get('.modal-body > h4 > .btn').click()

    
        cy.get('#typeahead-focus').type(libraryPaths.empty) // This gives a harmless "Invalid Path" error
        cy.get('.component-host-scrollable > .modal-footer > .btn-primary').contains("Share").click({force: true})
        cy.get('.modal-footer > .btn-primary').contains("Save").click({force: true})
    });


    it('Validate library was added', () => {
        cy.intercept('http://localhost:5000/api/library').as('loadLibrariesPage');
        cy.wait('@loadLibrariesPage')

        cy.get('span[id^="library-name--"] > a').as('libraryItems');

        // cy.get('span[id^="library-name--"] > a').then(items => {
        //     expect(items.filter(i => i ))
        // });

        cy.get('@libraryItems').contains(libraryName, {timeout: 1000});
    });






});