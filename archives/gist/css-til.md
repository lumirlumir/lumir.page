#. HTML에서 CSS를 사용하는 방법.
   - style 태그 : HTML 문서에 <style> ... </style> 태그를 삽입하여 CSS를 이용한다.
   - style 속성 : <li><a href="html.html" style="color:violet;">HTML</a></li> 와 같이, style 속성을 사용한다.

#. Tag, Class, ID
   - Tag : ' '(공백)
   - Class : '.'(온점)
      - Class에는 여러 개의 값이 들어올 수 있다. 하나의 태그가 2개 이상의 클래스에 영향을 받을 수 있다.
      - 2개 이상의 클래스는 띄어쓰기로 구분한다.
      - ex) <a href="html.html" class="A B">HTML</a>
   - ID : '#'(샵)
      - ID값은 HTML내에서 오직 한번만 등장해야한다. (ID는 유일한 값)(Class는 여러번 등장해도 된다.)

#. a { color:black; }
   - 'a{}' 부분을 '선택자(selector)'라고 한다. (효과를 누구에게 줄 것인가를 선택하는 것이기 때문.)
   - 'color:black;' 부분을 '효과 or 선언(declaration)'이라고 한다.
   - 'color' 부분을 '속성(property)'라고 한다.
   - 'black' 부분을 '값(value)'이라고 한다.

#. a {text-decoration: none;}
   - 하이퍼텍스트에서 밑줄 삭제.

#. a {text-decoration: underline;}
   - 하이퍼텍스트에서 밑줄 추가.

#. 외부 스타일 시트 : <link>
   - <link rel="stylesheet" href="/style.css">
   - rel = relation

#. block-level element & inline element
   - block-level element : 한칸 전체를 사용하는 태그. -> 'display:block' 으로 속성 지정 가능.
   - inline element : 자신의 컨텐츠 크기 만큼 일부만을 사용하는 태그. -> 'display:inline' 으로 속성 지정 가능.

#. display:none
   - 화면상에서 element를 지운다.

#. 축약
   h1, a {
	border-width:5px;
	border-color:red;
	border-style:solid;
   }
   위 코드를
   h1, a {
	border:5px solid red
   }
   와 같이 축약할 수 있다.

#. box model
   - 바깥에서부터, margin-border-padding-content 이다.

#. div [division] & span
   - div : block element 대상.
   - span : inline element 대상.

#. grid
   - #grid {
	display: grid; (block으로 설정하면 block element로 설정된다.)
	grid-template-columns: 150px 1fr /* 1번째 공간은 150픽셀, 2번째 공간은 나머지 공간 전부 */
	/* 1fr 1fr 은 1대1 비율, 2fr 1fr은 2대1 비율. */
     }

#. 반응형 웹
   @media(max-width:800px) {
	div {
		dispaly:none;
	}
   }

- 만약 특정 요소에 id, class가 모두 지정되어 있다면 스타일이 적용되는 우선순위는 tag < class < id 가 됩니다.

- HTML에 CSS 적용하기
CSS 문법에 대해 알아봤으니 이제 작성한 CSS를 HTML과 연결할 차례입니다. HTML과 CSS를 연결하는 방법은 크게 3가지로 나누어집니다.

    1. 인라인 스타일 (Inline Style): HTML 태그 내에 style 속성을 이용하여 CSS를 지정할 수 있습니다. 이 방법의 경우 이미 스타일을 적용할 요소가 지정되어 있기 때문에 선택자 및 선언 블록없이 바로 스타일 속성값을 지정합니다.

    2. 내부 스타일 시트(Internal Stylesheet): HTML 문서의 &lt;head&gt; 태그 내에 style 태그를 삽입하고 해당 태그 사이에 CSS 문법을 작성해 스타일을 지정할 수 있습니다. 이 경우 해당 HTML 문서에만 스타일이 적용됩니다.

    3. 외부 스타일 시트(External Stylesheet): HTML 문서 내부가 아닌 외부에서 CSS 파일을 작성했다면, HTML 문서의 head 태그 내에 link 태그를 삽입하여 HTML 문서에 CSS를 연결할 수 있습니다. link 태그의 rel 속성을 stylesheet로 지정하고 href 속성으로 CSS 파일의 경로를 지정하여 연결할 수 있습니다.
