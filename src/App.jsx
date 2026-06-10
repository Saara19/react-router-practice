import { createBrowserRouter, Outlet,Form,useNavigation ,RouterProvider,useLoaderData,useNavigate, redirect } from "react-router-dom"


const router=createBrowserRouter([
{
  path:"/",
  element:<Home />,


},
{
path:"/users",
element:<Users />,
loader:preperLoder,
children:[
{
  path:":id",
  element:<User />,
loader:preperLoderUser

}
]


},
{
  path:"/adduser",
  element:<AddUser />,
  action:perperNewUser
},
{
  path: "/success",
  element: <Success />
}

])
export default function App(){
  return <RouterProvider router={router} />
}
 function Home(){
    const navigation = useNavigate();
  return (
    <>
    <h1>Users Dashboard</h1>
    <button onClick={()=>navigation("/users")}> go to users</button>
    <button onClick={()=>navigation("adduser")}>Add User</button>
    </>
  )
 }
 function Users(){
  const navigation = useNavigate();
  const allUser=useLoaderData()
  return(
    <div>
  <Outlet />
<ul>
  {allUser.map(u=>
  <li   style={{
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    margin: "10px 0",
    cursor: "pointer",
  }}  key={u.id} onClick={()=>navigation(`/users/${u.id}`)} ><p>name:{u.name}</p><p>Email:{u.email}</p>
    <br />
  </li>

  
  )}
</ul>
</div>
  ) 

 }


 function User() {
  const data = useLoaderData();

  return (
    <div className="user-details">
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      <p>Website: {data.website}</p>
      <p>Phone: {data.phone}</p>
    </div>
  );
}
 function AddUser(){
  const navigation = useNavigation();
  return(
<Form method="post">
  <label htmlFor="username">Username</label>
  <input
    id="username"
    type="text"
    name="username"
  />

  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    name="email"
  />

  <label htmlFor="age">Age</label>
  <input
    id="age"
    type="number"
    name="age"
  />

  <button>
    {navigation.state === "submitting"
      ? "Sending..."
      : "Send"}
  </button>
</Form>

  )
 }
 function Success(){
  return<h2>Success</h2>
 }
 async function preperLoder(){
const users=await fetch("https://jsonplaceholder.typicode.com/users")
const data= await users.json();
console.log(data)
return data; 
 }

 async function preperLoderUser({params}){
const users=await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
const data=await users.json();

return data; 
}
async function perperNewUser({ request }) {
  const formData = await request.formData();

  const username = formData.get("username");

  await new Promise((resolve) =>
    setTimeout(resolve, 3000)
  );

  return redirect("/success");
}