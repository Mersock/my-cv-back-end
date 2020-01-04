import _ from 'lodash'

export const setOptions = (page, limit, sort = { createdAt: 1 }) => {
    let customLabels = {
        totalDocs: 'dataCount',
        docs: 'data',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount',
        pagingCounter: 'slNo',
        meta: 'meta',
    };
    return {
        page: page || 1,
        limit: limit || 10,
        sort: sort,
        customLabels: customLabels
    }
}

export const querySort = (column = 'createdAt', type = 'asc') => {
    let sort = {}
    sort[column] = type == 'asc' ? 1 : -1
    return sort
}

export const queryLike = (filter = {}) => {
    let filterLike = {}
    _.forEach(filter, function (value, key) {
        let filterString = {}
        if (!_.isEmpty(value)) {
            filterString[key] = { $regex: '.*' + value + '.*' }
            _.merge(filterLike, filterString)
        }
    })
    return filterLike
}