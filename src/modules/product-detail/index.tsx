import { Container, View } from "@components/elements";
import { Header } from "@components/widgets";
import ProductContent from "./product-content";

export default function ProductDetail() {
  return (
    <Container>
      <Header back title="Detail Barang" />
      <ProductContent />
    </Container>
  );
}
