import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';


function Pages({active, pages , setActive}) {

    let items = [];
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item className='mt-4' key={number} active={number == active} onClick={() => handlePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    function handlePage(newPage) {
        // window.location.search = `?page=${newPage}`;
        const url = new URL(window.location);
        url.searchParams.set('page', newPage);
        window.history.pushState({}, '', url);
        setActive(newPage);

    }
    return (
        <Pagination>{items}</Pagination>
    )
}
export default Pages