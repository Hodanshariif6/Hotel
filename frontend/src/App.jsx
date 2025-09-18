import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Product from "./pages/Product"
import UpdateProduct from "./components/One-time-use/updateProduct"
import AddProduct from "./pages/AddProduct"
import Carts from "./pages/Carts"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Slidebar from "./pages/Slidebar"
import ProtectedRouter from "./pages/ProtectedRouter"
import AddNews from "./pages/AddNew"
import News from "./pages/News"
import UpdateNews from "./components/One-time-use/updateNews"
import  About  from "./pages/About"
import  Contact  from "./pages/Contact"
import Customer from "./pages/customer"
import Report from "./pages/Report"
// import Setting  from "./pages/Setting"

// Layout leh Header (Home, Product)
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

// Layout leh Dashboard (Dashboard iyo Product-ka gudaha dashboard)
function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Dashboard /> {/* Sidebar-ka dashboard */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

function App() {
  return (
    
    <Routes>
      {/* Pages leh Header */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
          <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
          <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

      {/* Dashboard iyo Product gudaha Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            {/* Default dashboard page */}
          <Slidebar/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            <Product />
          </DashboardLayout>
          </ProtectedRouter>
        }
      />  <Route
        path="/customer"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            < Customer/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
          <Route
        path="/rep"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            < Report/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      />

                {/* <Route
        path="/Setting"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            < Setting/>
          </DashboardLayout>
          </ProtectedRouter>
        }
      /> */}

      
      
   <Route
        path="/new"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            <News />
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
    

      <Route
        path="/updateproduct/:id"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            <UpdateProduct />
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
      
      <Route
        path="/upnew/:id"
        element={
          <ProtectedRouter>
          <DashboardLayout>
            <UpdateNews />
          </DashboardLayout>
          </ProtectedRouter>
        }
      />
      <Route
        path="/registerproduct"
        element={
          <DashboardLayout>
            <AddProduct />
          </DashboardLayout>
        }
      />
       <Route
        path="/news"
        element={
          <DashboardLayout>
            <AddNews />
          </DashboardLayout>
        }
      />
      <Route
        path="/carts"
        element={
          <MainLayout>
            <Carts />
          </MainLayout>
        }
      />
       <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
       <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
       
    </Routes>
  )
}

export default App
