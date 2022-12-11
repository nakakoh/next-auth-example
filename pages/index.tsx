import { User } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import prisma from "../lib/prismadb";

type Props = {
  users?: User[];
};

export default function Home({ users }: Props) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        Role: {session.user?.role} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {users && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export const getServerSideProps = async () => {
  const users = await prisma?.user.findMany();
  return { props: { users } };
};
