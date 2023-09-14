export interface IPagination {
  elementToSkip: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: number | null
  previousPage: number | null
  lastPage: number
}

export class PaginationService {
  page = 0
  itemPerPage = 0
  totalItems = 0

  constructor (page: number, itemPerPage: number, totalItems: number) {
    this.page = page
    this.itemPerPage = itemPerPage
    this.totalItems = totalItems
  }

  getPagination (): IPagination {
    return {
      elementToSkip: this.getElementToSkip(),
      totalItems: this.totalItems,
      hasNextPage: this.hasNextPage(),
      hasPreviousPage: this.hasPreviousPage(),
      nextPage: this.getNextPage(),
      previousPage: this.getPreviousPage(),
      lastPage: this.getLastPage()
    }
  }

  private getElementToSkip () {
    return (this.totalItems <= this.itemPerPage) ? 0 : (this.page - 1) * this.itemPerPage
  }

  private hasNextPage () {
    return this.itemPerPage * this.page < this.totalItems
  }

  private hasPreviousPage () {
    return this.page > 1
  }

  private getNextPage () {
    return (this.hasNextPage()) ? this.page + 1 : null
  }

  private getPreviousPage () {
    return (this.hasPreviousPage()) ? this.page - 1 : null
  }

  private getLastPage () {
    return Math.ceil(this.totalItems / this.itemPerPage)
  }
}
