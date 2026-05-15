/**
 * 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호
 * @param {number} endNum - 끝 파일 번호
 * @param {string} ext - 확장자 (jpg, png 등)
 */
async function downloadSequentially(baseUrl, startNum, endNum, ext = 'jpg') {
    // URL 끝에 슬래시(/) 처리 보장
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 2자리나 3자리 포맷팅이 필요하면 변경 가능 (예: 01, 001)
        // 여기서는 일반 넘버링(1, 2, 3...) 기준입니다.
        const fileName = 'xiaoeun_000'+`${i}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            // 1. 이미지 데이터를 Fetch API로 호출
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일을 찾을 수 없거나 에러 발생: ${fileName} (넘어갑니다)`);
                continue; 
            }
            
            // 2. 응답 데이터를 Blob으로 변환
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            // 3. 가상 <a> 태그 생성 및 클릭 이벤트 트리거
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName; // 다운로드될 파일명 설정
            
            document.body.appendChild(link);
            link.click();
            
            // 4. 메모리 해제 및 가상 태그 삭제
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지를 위한 0.5초(500ms) 대기 시간
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
// 대상 URL 주소와 파일 넘버링 범위(예: 1번부터 50번까지)를 지정하세요.
const targetUrl = 'https://nudogram.com/contents/x/i/xiaoeun/1000/';
downloadSequentially(targetUrl, 1, 99, 'jpg');


//-----------------4자리 url_1-------------------
/**
 * 4자리 넘버링 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호 (예: 1)
 * @param {number} endNum - 끝 파일 번호 (예: 50)
 * @param {string} ext - 확장자
 */
async function downloadSequentially4Digit(baseUrl, startNum, endNum, ext = 'jpg') {
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 4자리 문자열로 변환 (예: 1 -> "0001", 12 -> "0012")
        const paddedNum = String(i).padStart(4, '0');
        const fileName = 'xiaoeun_'+`${paddedNum}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일 없음 또는 에러: ${fileName} (건너뜀)`);
                continue; 
            }
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지 (0.5초 대기)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
const targetUrl = 'https://nudogram.com/contents/x/i/xiaoeun/1000/';
// 예시: 1번(0001.jpg)부터 100번(0100.jpg)까지 다운로드할 경우
downloadSequentially4Digit(targetUrl, 1, 100, 'jpg');

//-----------------4자리 url_2-------------------
/**
 * 4자리 넘버링 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호 (예: 1)
 * @param {number} endNum - 끝 파일 번호 (예: 50)
 * @param {string} ext - 확장자
 */
async function downloadSequentially4Digit(baseUrl, startNum, endNum, ext = 'jpg') {
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 4자리 문자열로 변환 (예: 1 -> "0001", 12 -> "0012")
        const paddedNum = String(i).padStart(4, '0');
        const fileName = 'xiaoeun_'+`${paddedNum}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일 없음 또는 에러: ${fileName} (건너뜀)`);
                continue; 
            }
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지 (0.5초 대기)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
const targetUrl = 'https://fapeza.com/media/x/i/xiaoeun/1000/';
// 예시: 1번(0001.jpg)부터 100번(0100.jpg)까지 다운로드할 경우
downloadSequentially4Digit(targetUrl, 1, 100, 'jpg');

//-----------------4자리 url_3-------------------
/**
 * 4자리 넘버링 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호 (예: 1)
 * @param {number} endNum - 끝 파일 번호 (예: 50)
 * @param {string} ext - 확장자
 */
async function downloadSequentially4Digit(baseUrl, startNum, endNum, ext = 'jpg') {
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 4자리 문자열로 변환 (예: 1 -> "0001", 12 -> "0012")
        const paddedNum = String(i).padStart(4, '0');
        const fileName = 'xiaoeun_'+`${paddedNum}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일 없음 또는 에러: ${fileName} (건너뜀)`);
                continue; 
            }
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지 (0.5초 대기)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
const targetUrl = 'https://nudostar.com/content/x/i/xiaoeun/1000/';
// 예시: 1번(0001.jpg)부터 100번(0100.jpg)까지 다운로드할 경우
downloadSequentially4Digit(targetUrl, 1, 100, 'jpg');

//-----------------4자리 url_4-------------------
/**
 * 4자리 넘버링 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호 (예: 1)
 * @param {number} endNum - 끝 파일 번호 (예: 50)
 * @param {string} ext - 확장자
 */
async function downloadSequentially4Digit(baseUrl, startNum, endNum, ext = 'jpg') {
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 4자리 문자열로 변환 (예: 1 -> "0001", 12 -> "0012")
        const paddedNum = String(i).padStart(4, '0');
        const fileName = 'xiaoeun_'+`${paddedNum}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일 없음 또는 에러: ${fileName} (건너뜀)`);
                continue; 
            }
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지 (0.5초 대기)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
const targetUrl = 'https://fapodrop.com/images/x/i/xiaoeun/1/photo/';
// 예시: 1번(0001.jpg)부터 100번(0100.jpg)까지 다운로드할 경우
downloadSequentially4Digit(targetUrl, 1, 100, 'jpeg');

//-----------------4자리 url_5-------------------
/**
 * 4자리 넘버링 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호 (예: 1)
 * @param {number} endNum - 끝 파일 번호 (예: 50)
 * @param {string} ext - 확장자
 */
async function downloadSequentially4Digit(baseUrl, startNum, endNum, ext = 'jpg') {
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 4자리 문자열로 변환 (예: 1 -> "0001", 12 -> "0012")
        const paddedNum = String(i).padStart(4, '0');
        const fileName = 'xiaoeun_'+`${paddedNum}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일 없음 또는 에러: ${fileName} (건너뜀)`);
                continue; 
            }
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지 (0.5초 대기)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
const targetUrl = 'https://thefappeningblog.com/data/x/i/xiaoeun/1000/';
// 예시: 1번(0001.jpg)부터 100번(0100.jpg)까지 다운로드할 경우
downloadSequentially4Digit(targetUrl, 1, 100, 'jpg');

//-----------------4자리 url_6-------------------
/**
 * 4자리 넘버링 순차적 이미지 자동 다운로드 스크립트
 * @param {string} baseUrl - 이미지가 저장된 기본 폴더 URL
 * @param {number} startNum - 시작 파일 번호 (예: 1)
 * @param {number} endNum - 끝 파일 번호 (예: 50)
 * @param {string} ext - 확장자
 */
async function downloadSequentially4Digit(baseUrl, startNum, endNum, ext = 'jpg') {
    const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    
    for (let i = startNum; i <= endNum; i++) {
        // 숫자를 4자리 문자열로 변환 (예: 1 -> "0001", 12 -> "0012")
        const paddedNum = String(i).padStart(4, '0');
        const fileName = 'xiaoeun_'+`${paddedNum}.${ext}`;
        const imageUrl = `${formattedBaseUrl}${fileName}`;
        
        console.log(`시도 중 (${i}/${endNum}): ${imageUrl}`);
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                console.warn(`파일 없음 또는 에러: ${fileName} (건너뜀)`);
                continue; 
            }
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            
            console.log(`다운로드 완료: ${fileName}`);
            
        } catch (error) {
            console.error(`다운로드 실패: ${fileName}`, error);
        }
        
        // 브라우저 과부하 및 차단 방지 (0.5초 대기)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(' 모든 다운로드 작업이 완료되었습니다.');
}

// --- 실행 구간 ---
const targetUrl = 'https://fapullo.com/all/x/i/xiaoeun/1000/';
// 예시: 1번(0001.jpg)부터 100번(0100.jpg)까지 다운로드할 경우
downloadSequentially4Digit(targetUrl, 1, 100, 'jpg');