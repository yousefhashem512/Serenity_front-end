import { Moon } from 'lucide-react';

const SubTitle = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      margin: '10px 0',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* الخط الفاصل العلوي مع الريشة */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#d4b08c' }}></div>
        <span style={{ color: '#d4b08c', fontSize: '20px' }}><Moon /></span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#d4b08c' }}></div>
      </div>

      {/* نص الحديث */}
      <div style={{
        fontFamily: "'Cairo', sans-serif", // يفضل استخدام خط عربي كلاسيكي
        direction: 'rtl',
        color: '#4a4a4a'
      }}>
        <p style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          lineHeight: '1.6'
        }}>
          <span style={{ color: '#b08d57' }}>قَالَ النَّبِيُّ ﷺ: "خَيْرُ مَا تَدَاوَيْتُمْ بِهِ الْحِجَامَةُ"</span>
        </p>

        <p style={{
          fontSize: '0.9rem',
          color: '#2F1E19',
          margin: 0,
          fontStyle: 'italic'
        }}>
          صحيح البخاري
        </p>
      </div>
    </div>
  );
};

export default SubTitle;