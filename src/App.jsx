import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [attendance, setAttendance] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedEmp = JSON.parse(localStorage.getItem('employees') || '[]');
    const savedAtt = JSON.parse(localStorage.getItem('attendance') || '[]');
    setEmployees(savedEmp);
    setAttendance(savedAtt);
  }, []);

  const addEmployee = (e) => {
    e.preventDefault();
    if (!name || !position) return;
    const newEmp = { id: Date.now(), name, position };
    const updated = [...employees, newEmp];
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setName('');
    setPosition('');
  };

  const checkIn = (empId, empName) => {
    const record = { id: Date.now(), empId, empName, time: new Date().toLocaleString(), type: 'Check-in' };
    const updated = [record, ...attendance];
    setAttendance(updated);
    localStorage.setItem('attendance', JSON.stringify(updated));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Hệ Thống Điểm Danh Nhân Viên</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Thêm Nhân Viên</h3>
          <form onSubmit={addEmployee}>
            <input placeholder="Tên nhân viên" value={name} onChange={e => setName(e.target.value)} style={{ display:'block', marginBottom:'10px', padding:'8px', width:'90%'}} />
            <input placeholder="Chức vụ" value={position} onChange={e => setPosition(e.target.value)} style={{ display:'block', marginBottom:'10px', padding:'8px', width:'90%'}} />
            <button type="submit" style={{ padding:'8px 16px', cursor:'pointer' }}>Lưu nhân viên</button>
          </form>

          <h3>Danh sách nhân viên</h3>
          <ul style={{ paddingLeft: '20px' }}>
            {employees.map(emp => (
              <li key={emp.id} style={{ marginBottom: '10px' }}>
                <strong>{emp.name}</strong> - {emp.position} <br/>
                <button onClick={() => checkIn(emp.id, emp.name)} style={{ marginTop:'5px', cursor:'pointer' }}>Check-in ngay</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
          <h3>Lịch sử điểm danh</h3>
          {attendance.length === 0 ? <p>Chưa có dữ liệu</p> : (
            <ul>
              {attendance.map(att => (
                <li key={att.id} style={{ marginBottom:'10px' }}>
                  <strong>{att.empName}</strong> <br/>
                  <span style={{ color: 'green' }}>{att.type}</span>: {att.time}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;