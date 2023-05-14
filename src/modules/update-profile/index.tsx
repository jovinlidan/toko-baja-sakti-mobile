import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import UpdateProfileForm from "./update-profile-form";

export default function UpdateProfile() {
  return (
    <Container>
      <Header title="Ubah Profil" back />
      <Content>
        <UpdateProfileForm />
      </Content>
    </Container>
  );
}
