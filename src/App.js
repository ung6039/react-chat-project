import React,{Component} from 'react';
import $ from 'jquery'



/*
    class 기반 컴포넌트 = > Hooks를 사용 할 수 없다
                          =====
                          function 기반에서 class기반에서 사용하는 생명주기 사용할 수 있게 만든다.
                          class : props, state
                                  => 생명 주기 함수
                                  constructor()
                                  componentWillMount()
                                  render()
                                  componentDidMount() ===> 메모리에 html을 저장

                                  => 데이터 변경
                                      setState()
                                      => componentWillUpdate()
                                      => render
                                      => componentDidUpdate() ==> 수정

=================================================================================

                          function : props, state(x) => state를 관리하는 프로그램
                                                        =====
                                                        데이터
                                     => function은 모든 함수가 => render()
                                     function App() ==> render를 만들겠음
                         props는 값을 변경할 수 없음 (! props는 속성 값 :: 속성 안에 있는 값을 변경할 수 없음)
                         => state를 사용해서 값을 변경해서 처리할 수 있도록 함 : Hooks
                         function App() => render : 화면 UI(HTML)

                         state를 사용 ==> useState()
                         !! (state를 사용하는 이유) : setState()를 이용해서 render를 호출( 값을 변경해주기 위해서 )
                         => const [page,setPage] = useState(1);
                              var page
                         ==> setPage(2) ==> render()
                              => reload() => 함수 호출

                         ??  state.page=1 :: state에 값이 저장되지만 state 를 통해 사용할 수 없음
                         !! setPage(1) :: setState()메서드를 통해서 값이 저장

                         ????
                         executeQuery(){
                              sql문 수행
                         }
                         execueUpdate(){
                              sql문 수행
                              commit()
                         }
 */

class App extends Component{
  constructor(props) {
    super(props);
  }
}


export default App;
