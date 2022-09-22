describe('Existing User.cy', () => {

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


  it('log in', () => {
    cy.login()
  })

  it('create an empty library', () => {
    cy.get('.not-xs-only > .dark-exempt').click()
    cy.contains('Libraries').click()
    cy.contains('Add Library').click()

    cy.get('#library-name').type('Cypress_Empty')
    cy.get('#library-type').select('Book')
    cy.get('.modal-body > h4 > .btn').click()

    

    cy.get('#typeahead-focus').type(libraryPaths.empty) // This gives a harmless "Invalid Path" error
    cy.get('.component-host-scrollable > .modal-footer > .btn-primary').contains("Share").click({force: true})
    cy.get('.modal-footer > .btn-primary').contains("Save").click({force: true})

  })

  // Validate scan fails if library is an empty folder
  it('error message if a library is empty', {
      retries: { // 7 Retries * 4 seconds (28 total) should be enough
        runMode: 7,
        openMode: 7,
      },
    }, () => {

    cy.get('app-nav-events-toggle > .btn').click()
    cy.contains("Some of the root folders for the library")
  })


  //Delete a library
  it('delete a library', () => {
    cy.get('.not-xs-only > .dark-exempt').click()
    cy.contains('Libraries').click()
    cy.get('.btn-danger').click()
    cy.get('.modal-footer').contains('Confirm').click()

    //Sometimes you need to click off and back it seems. Should probably be fixed
    cy.contains('Users').click()
    cy.contains('Libraries').click()

    // Validate that the "no library" message shows
    cy.get('.list-group-item').contains('There are no libraries')
  })


  // Create a new library
  it('create a library', () => {
    cy.get('.not-xs-only > .dark-exempt').click()
    cy.contains('Libraries').click()
    cy.contains('Add Library').click()

    cy.get('#library-name').type('Cypress_Books')
    cy.get('#library-type').select('Book')
    cy.get('.modal-body > h4 > .btn').click()

    cy.get('#typeahead-focus').type(testDirectory) // This causes a "Invalid Path" Kavita error, but it's safe to ignore
    cy.get('.component-host-scrollable > .modal-footer > .btn-primary').contains("Share").click({force: true})
    cy.get('.modal-footer > .btn-primary').contains("Save").click({force: true})

    cy.get('.side-nav-item').contains('Books')
  })


  // Validate that a new library scans
  it('and validate that it scans', {
      retries: {
        runMode: 7,
        openMode: 7,
      },
    }, () => {
      cy.get('.side-nav-item').contains('Books').click()
      cy.get('.subtitle-with-actionables').contains('3 Series')
  })


  //Scan a library
  it('Scan a library', () => {
    cy.get('.not-xs-only > .dark-exempt').click()
    cy.contains('Libraries').click()
    cy.get('h4 > .float-end > .btn-secondary').click()
    cy.wait(1000)
    cy.get('.ng-trigger').contains("A scan has")
  })


/*
  //Validate last scanned updates
  it('Validate last scanned library updates', () => {

  })

  //Edit library folders and validate scan happens
  it('Edit library folders and validate scan happens', () => {

  })
*/

})
