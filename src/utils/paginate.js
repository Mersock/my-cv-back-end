import _ from 'lodash'

export const setOptions = (page, limit, sort = { createdAt: 1 }, populate = null, select = null) => {
    let customLabels = {
        totalDocs: 'dataTotal',
        docs: 'data',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageTotal',
        pagingCounter: 'slNo',
        meta: 'meta',
    };
    return {
        page: page || 1,
        limit: limit || 10,
        sort: sort,
        populate: populate,
        select: select,
        customLabels: customLabels
    }
}

export const querySort = (column = 'createdAt', type = 'asc') => {
    let sort = {}
    sort[column] = type == 'asc' ? 1 : -1
    return sort
}

export const queryEquals = (filter = {}) => {
    let filterEquals = {}
    _.forEach(filter, function (value, key) {
        let filterString = {}
        if (!_.isEmpty(value)) {
            filterString[key] = value
            _.merge(filterEquals, filterString)
        }
    })
    console.log(filterEquals)
    return filterEquals
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

