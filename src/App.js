import React,{Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import io from 'socket.io-client'
// <script src="">
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
const socket=io.connect('http://localhost:7777')

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      movie:[],
      logs:[] // 채팅 문자열 ( 글을 저장 )
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3355/movie').then((result)=>{
        this.setState({movie:result.data})
    })
    socket.on('chat_msg',(obj)=>{
      const log2 =this.state.logs;
      log2.push(obj)
      // 채팅에 입력된 데이터가 사라지지 않고 남아 있도록 문자열을 결합
      this.setState({logs:log2});
    })
    $('div#chat').toggleClass('active');
    var $win = $(window);
    var top = $(window).scrollTop(); // 현재 스크롤바의 위치값을 반환합니다.

    /*사용자 설정 값 시작*/
    var speed          = 1000;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
    var easing         = 'linear'; // 따라다니는 방법 기본 두가지 linear, swing
    var $layer         = $('div#chat_container'); // 레이어셀렉팅
    var layerTopOffset = 0;   // 레이어 높이 상한선, 단위:px
    $layer.css('position', 'absolute');
    /*사용자 설정 값 끝*/

    // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
    if (top > 0 )
      $win.scrollTop(layerTopOffset+top);
    else
      $win.scrollTop(0);

    //스크롤이벤트가 발생하면
    $(window).scroll(function(){

      var yPosition = $win.scrollTop()+300;
      if (yPosition< 0)
      {
        yPosition = $win.scrollTop()+300;
      }
      $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
    });
  }
  render() {
    const html = this.state.movie.map((m)=>
        <div className="col-md-4">
          <div className="thumbnail">
            <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
            <div className="caption">
              <p>{m.title}</p>
            </div>
          </div>
        </div>
    )
    return (
        <React.Fragment>
        <div className={"row"}>
          {html}
        </div>
          <ChatMain logs= {this.state.logs}/>
        </React.Fragment>
    )
  }
}
class ChatMain extends Component{

  render(){
      const html = this.props.logs.map((m)=>
          <div className={"message right"}>
            <div className={"message-text"}>
                {m.message}
            </div>
          </div>
      )
    return(
        <div id={"chat_container"}>
            <div id={"chat"} className={"active"}>
              <header>
                <h1>Chat</h1>
              </header>
              <section className={"content"}>
                <div className={"message_content"}>
                  {html}
                </div>
              </section>
              <ChatForm/>
            </div>
        </div>
    )
  }
}


class ChatForm extends Component{
  constructor(props) {
    super(props);
    this.state={
      message:''
    }
  }
  messageChange(e)
  {
    this.setState({message:e.target.value})
  }
  send(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // 이벤트 동작 정지(_javascript_)
      // 메세지를 전송
      socket.emit('chat_msg', {
        message: this.state.message
      })
      this.setState({message: ''}) // 입력창 초기화   ===> 초기화된 (message)를  <input value=" ">에 출력

    }
  }
  render(){
    return(
      <form action={""}>
          <input id={"input_chat"} type={"text"}
            onChange={this.messageChange.bind(this)}
            onKeyPress={this.send.bind(this)}
                 value={this.state.message}
          />
      </form>
    )
  }
}
export default App;
