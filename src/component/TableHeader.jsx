import { Dropdown, DropdownButton } from 'react-bootstrap';

function TableHeader({ title, onSort }) {
  return (
    <th>
      <div className="d-flex justify-content-between align-items-center">
        <span>{title}</span>
        <DropdownButton
          id={`dropdown-${title}`}
          title="⚙️"
          size="sm"
          variant="outline-light"
          className="table-header-dropdown"
        >
          <Dropdown.Item onClick={() => onSort('asc')}>
            ⬆️ Ascending order
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onSort('desc')}>
            ⬇️ Descending order
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => onSort('natural')}>
            🔄 Natural order
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </th>
  );
}

export default TableHeader;
