import "./cde.css";
import { createBrowserRouter, data, Link, Outlet, RouterProvider,useLoaderData,useNavigate,useParams} from "react-router-dom"
const router=  createBrowserRouter([
{
  path:"/",
  element:<Layout />,
  children:[
{index:true,
  element:<Home />
},
{path :"user",
  element:<User />,
  children:[
    {
      path:":n",
      element:<UserDetails />,
      loader:handleLoderForDetales,
      errorElement:<Errorpage />

    }
  ],
loader: handleLoader 
  //errorElement:<E
  // rrorElement />

},
{path:"about",
  element:<About />

},
  ]

}


])
export default function App() {
  return <RouterProvider router={router} />
}
function Layout(){
  return(
    <>
    <nav>
<Link to={"/"}>Home</Link>
<Link to={"/about"}>About</Link>
<Link to={"/user"}>Users</Link>
</nav>
      <Outlet />

    </>
  )
}
function Home (){
  const naveget=useNavigate()
  return (
<>
<h1>Users Directory</h1>

<p>
  A simple React Router project demonstrating nested routes,
  dynamic routes, loaders, navigation, and error handling.
  Browse the users list and explore user profiles.
</p>
<button onClick={()=>naveget("/about")}>go to about</button>

</>

  )
}
function About(){
  return (

    <>
    <h1>Im from about </h1>

    </>
  )
  
}
function User() {
  const users = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="users-layout">
      <div className="users-list">
        {users.map((u) => (
          <button
            key={u.id}
            onClick={() => navigate(`/user/${u.id}`)}
          >
            {u.name}
          </button>
        ))}
      </div>

      <div className="user-details">
        <Outlet />
      </div>
    </div>
  );
}
///هذا لودير للابن لانه لا يجوز استخد\ام لودير الاب هنا 
 async function handleLoderForDetales({params }){
  const res=await fetch("https://jsonplaceholder.typicode.com/users")
 const data = await res.json();
 if (Number( params.n) === 8){
   throw new Error("User Not Found");
  
 }
  return data;
  
 }
function UserDetails() {
  const users = useLoaderData();
  const { n } = useParams();

  const user = users.find((u) => u.id === Number(n)

);
      


  return (
  <div className="user-card">
    <h2>Name: {user.name}</h2>
    <h2>
      Address: {user.address.street} {user.address.suite}
      {" "}
      {user.address.city}
    </h2>
    <h2>Company: {user.company.name}</h2>
    <h2>Email: {user.email}</h2>
  </div>
);}

 async function handleLoader(){
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  const data=  await res.json()
  console.log(data)
  return data ;
}
function Errorpage() {
  return (
    <div className="error-page">
      <h1>This User Not Found</h1>
    </div>
  );
}