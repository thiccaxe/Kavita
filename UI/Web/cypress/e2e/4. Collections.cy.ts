describe('User flows for collections', () => {

  const cname = "Test Collection"

  // Deletes the most recent collection
  function DeleteMostRecentCollection() {
    cy.get('.side-nav-item').contains('Collections').click()

    OpenActionMenu('.card-body', 0)

    cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > .dropdown-item').contains('Edit').click()
    cy.get('#selectall').click()
    cy.get('.btn-primary').click()
    cy.get('app-confirm-dialog > .modal-footer').contains('Confirm').click()
  }

  function OpenActionMenu(selector: string, eq: number) {
    cy.get(selector).within(() => {
      cy.get('.fa').eq(eq).click()
    })
  }


  it('log in', () => {
    cy.login()
  })


  it('Add 1 Series from Library', () => {
    cy.get('.side-nav-item').contains('Books').click()

    OpenActionMenu('#jumpbar-index--0 > app-series-card > app-card-item > .card > .card-body', 1)

    cy.get('[data-popper-placement="top-start"] > .dropdown-menu').contains('Add to Collection').click()
    cy.get('#add-rlist').type(cname)
    cy.get('.btn').contains('Create').click()

    // Check that it was added
    cy.get('.side-nav').contains('Collections').click()
    cy.get('.grid').contains(cname)
  })

  it('Check that the collection item has the collection tag', () => {
    cy.get('.side-nav-item').contains('Books').click()
    cy.get('#jumpbar-index--0 > app-series-card > app-card-item > .card > .card-body').click()
    cy.get('.col-md-10').contains(cname).click()
  })

  it('Delete Collection', () => {
    DeleteMostRecentCollection()
  })

  //Check that collection item(s) have the collection metadata tag in series view

})

// Can add/edit/delete series from Collection     - Done
// Series with Collection shows in metadata area  - Done
// Dashboard - Admin - Add to Collection          -
// Search by collection name                      -
// add more...
