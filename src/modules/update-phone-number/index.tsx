import { Container, Content } from "@components/elements";
import { Header } from "@components/widgets";
import UpdatePhoneNumberForm from "./update-phone-number-form";

export default function UpdatePhoneNumber() {
  return (
    <Container>
      <Header title="Ubah No. Handphone" back />
      <Content>
        <UpdatePhoneNumberForm />
      </Content>
    </Container>
  );
}
