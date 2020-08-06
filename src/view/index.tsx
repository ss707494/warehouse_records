import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {Home} from './Home'
import {MenuLayout} from '../component/MenuLayout/MenuLayout'
import {DateWrapperApollo} from '../component/DateWarpper'
import {SnackbarProviderWrapper} from '../component/SnackbarProvider'
import {NoMatch} from '../component/NoMatch'
import {everyDayDataRouter} from './EveryDayData/router'

const routes = [
  {
    path: '/home',
    component: Home,
  },
  ...everyDayDataRouter,
]

export default function RouteConfig() {
  return [
    SnackbarProviderWrapper,
    DateWrapperApollo,
  ].reduce((previousValue, currentValue) => currentValue(previousValue),
      <>
        <Router>
          <Switch>
            <Redirect
                exact={true}
                path={'/'}
                to={'/home'}
            />
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route component={NoMatch}/>
          </Switch>
        </Router>
      </>,
  )
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route: any) {
  return (
      <Route
          path={route.path}
          render={(props: any) => (
              route.Layout ? <route.Layout>
                <route.component {...props} routes={route.routes}/>
              </route.Layout> : <MenuLayout>
                <route.component {...props} routes={route.routes}/>
              </MenuLayout>
              // pass the sub-routes down to keep nesting
          )}
      />
  )
}

