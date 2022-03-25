import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Detail from '../pages/detail/Detail'
import Catalog from '../pages/Catalog'


const Routes = () => {
    return (
        <Switch>
            <Route
                element={<Catalog />}
                path='/:category/search/:keyword'
            />
            <Route
                element={<Detail />}
                path='/:category/:id'
            />
            <Route
                element={<Catalog />}
                path='/:category'
            />
            <Route path='/' exact element={<Home />} />
        </Switch>
    )
}

export default Routes