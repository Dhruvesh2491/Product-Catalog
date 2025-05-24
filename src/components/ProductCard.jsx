import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
    <Card className="h-100 shadow-sm w-">
        <Card.Img
            variant="top"
            src={product.image}
            className="p-3"
            style={{ height: '200px', objectFit: 'contain' }}
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="fs-6">{product.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
            <Card.Text className="text-capitalize small">{product.category}</Card.Text>
            <div className="mt-auto">
                <Link to={`/products/${product.id}`}>
                    <Button variant="dark" size="sm">View Details</Button>
                </Link>
            </div>
        </Card.Body>
    </Card>
);

export default ProductCard;
