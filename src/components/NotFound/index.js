import './index.css'

const NotFound = () => (
  <div className="notfound-bg-container">
    <img
      className="notfound-image"
      src="https://res-console.cloudinary.com/dktwlx0dz/thumbnails/transform/v1/image/upload/Yl9hdXRvOnByZWRvbWluYW50LGNfcGFkLGhfMzAwLHdfMzAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/Y2NicC1taW5pLXByb2plY3QtaW5zdGEtc2hhcmUvbm90LWZvdW5kX3NlY3J0bQ==/template_primary"
      alt="Not found"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <button className="notfound-button" type="button">
      Back to home
    </button>
  </div>
)

export default NotFound
