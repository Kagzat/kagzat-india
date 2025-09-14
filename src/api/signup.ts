// import { supabase } from "../lib/supabase";
// import { toast } from "../hooks/use-toast";

// export const signup = async (creds, method: string) => {
//   switch (method) {
//     case "email":
//       try {
//         const { email, password } = creds;
//         const { data } = await supabase.auth.signUp({
//           email,
//           password,
//           //   options: { data: { user_pool: "document_owner" } },
//         });
//         localStorage.setItem("document_owner", JSON.stringify(data));
//         toast({
//           title: "Success!",
//           description: "SignUp Succesful",
//         });

//         return data;
//       } catch (err) {
//         toast({
//           title: "Errror!",
//           description: err.message,
//         });
//         break;
//       }

//     case "google":
//       try {
//         const { data } = await supabase.auth.signInWithOAuth({
//           provider: "google",
//           options: {
//             redirectTo: window.location.origin, // or a specific post-login route
//           },
//         });
//         localStorage.setItem("document_owner", JSON.stringify(data));
//         toast({
//           title: "Success!",
//           description: "SignUp Succesful",
//         });
//         return data;
//       } catch (err) {
//         console.error("Error Signing up", err.message);
//         toast({
//           title: "Errror!",
//           description: err.message,
//         });
//         break;
//       }

//     default:
//       break;
//   }
// };
