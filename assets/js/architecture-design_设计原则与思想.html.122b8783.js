"use strict";(self.webpackChunkgo_beyond=self.webpackChunkgo_beyond||[]).push([[352],{8295:(e,i)=>{i.A=(e,i)=>{const a=e.__vccOpts||e;for(const[e,l]of i)a[e]=l;return a}},4902:(e,i,a)=>{a.r(i),a.d(i,{comp:()=>s,data:()=>t});var l=a(4691);const n={},s=(0,a(8295).A)(n,[["render",function(e,i){return(0,l.uX)(),(0,l.CE)("div",null,i[0]||(i[0]=[(0,l.Fv)('<h1 id="设计原则与思想" tabindex="-1"><a class="header-anchor" href="#设计原则与思想"><span>设计原则与思想</span></a></h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>面向对象、设计原则、设计模式、编程规范、重构技巧之间的关系。</p><figure><img src="https://static001.geekbang.org/resource/image/f3/d3/f3262ef8152517d3b11bfc3f2d2b12d3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>面向对象编程因为具有丰富的特性(抽象、封装、继承、多态)，可以实现很多复杂的设计思路，是很多设计原则、设计模式等编码实现的基础。</li><li>设计原则是指导我们代码设计的一些经验总结，对与某些场景下，是否应该应用某种设计模式具有指导意义，比如，开闭原则是很多设计模式(策略、模板等)的指导原则。</li><li>设计模式是针对软件开发过程中常遇到一些设计问题，总结出来的一套解决方案或者设计思路。应用设计模式的主要目的是<strong>提高代码的可扩展性</strong>。从抽象程度上来说，设计原则比设计模式更抽象。设计模式更加具体、更加可执行。</li><li>编程规范主要解决的是代码的<strong>可读性问题</strong>。编码规范相对于设计原则、设计模式，更加具体、更加偏重代码细节、更加能落地。持续的小重构依赖的理论基础主要就是编程规范。</li><li>重构作为保持代码质量不下降的有效手段，利用的就是面向对象、设计原则、设计模式、编码规范这些理论。</li></ul><p>​ 实际上，面向对象、设计原则、设计模式、编程规范、代码重构，这五者都是保持或者提高代码质量的方法论，本质上都是服务于编写高质量代码这一件事的。当我们追本逐源，看清这个本质之后，很多事情怎么做就清楚了，很多选择怎么选也清楚了。比如，在某个场景下，该不该用这个设计模式，那就看能不能提高代码的可扩展性；要不要重构，那就看重代码是否存在可读、可维护问题等。</p><h2 id="一、代码质量评判标准" tabindex="-1"><a class="header-anchor" href="#一、代码质量评判标准"><span>一、代码质量评判标准</span></a></h2><h3 id="_01-如何评价代码质量的高低" tabindex="-1"><a class="header-anchor" href="#_01-如何评价代码质量的高低"><span>01|如何评价代码质量的高低？</span></a></h3><p>标准多，带有主观性，无法用单一的标准来评判，。代码质量高低是一个综合各种因素得到的结论。我们并不能通过单一维度去评价一段代码的好坏。</p><h3 id="_02-最常用的评价标准" tabindex="-1"><a class="header-anchor" href="#_02-最常用的评价标准"><span>02|最常用的评价标准</span></a></h3><h4 id="最常用" tabindex="-1"><a class="header-anchor" href="#最常用"><span>最常用</span></a></h4><ol><li>可维护性：所谓的“维护”无外乎就是修改 bug、修改老的代码、添加新的代码之类的工作。所谓“代码易维护”就是指，在不破坏原有代码设计、不引入新的 bug 的情况下，能够快速地修改或者添加代码。所谓“代码不易维护”就是指，修改或者添加代码需要冒着极大的引入新 bug 的风险，并且需要花费很长的时间才能完成。</li><li>可扩展性：们在不修改或少量修改原有代码的情况下，通过扩展的方式添加新的功能代码。说直白点就是，代码预留了一些功能扩展点，你可以把新功能代码，直接插到扩展点上，而不需要因为要添加一个功能而大动干戈，改动大量的原始代码。</li><li>可读性：“任何傻瓜都会编写计算机能理解的代码。好的程序员能够编写人能够理解的代码”。需要看代码是否符合编码规范、命名是否达意、注释是否详尽、函数是否长短合适、模块划分是否清晰、是否符合高内聚低耦合等等。</li></ol><h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h4><ol><li><p>灵活性：如果一段代码易扩展、易复用或者易用，我们都可以称这段代码写得比较灵活。所以，灵活这个词的含义非常宽泛，很多场景下都可以使用。</p></li><li><p>简洁性：KISS原则，尽量保持代码简单。代码简单、逻辑清晰，也就意味着易读、易维护。<strong>思从深而行从简，真正的高手能云淡风轻地用最简单的方法解决最复杂的问题</strong>。这也是一个编程老手跟编程新手的本质区别之一。</p></li><li><p>可复用性：代码的可复用性可以简单地理解为，尽量减少重复代码的编写，复用已有的代码。</p></li><li><p>可测试性：代码可测试性的好坏，能从侧面上非常准确地反应代码质量的好坏。代码的可测试性差，比较难写单元测试，那基本上就能说明代码设计得有问题。</p></li></ol><h3 id="_03-如何写出高质量的代码" tabindex="-1"><a class="header-anchor" href="#_03-如何写出高质量的代码"><span>03|如何写出高质量的代码：</span></a></h3><p>写出高质量代码，我们就需要掌握一些更加细化、更加能落地的编程方法论。综合运用<strong>设计思想、设计原则、设计模式、编程规范和重构技巧</strong>。</p><h2 id="二、面向对象" tabindex="-1"><a class="header-anchor" href="#二、面向对象"><span>二、面向对象</span></a></h2><h3 id="_01-面向对象概述" tabindex="-1"><a class="header-anchor" href="#_01-面向对象概述"><span>01|面向对象概述</span></a></h3><p>主流的编程范式或者编程风格有三种，它们分别是<strong>面向过程、面向对象和函数式编程</strong>。面向对象编程因为其具有丰富的特性（封装、抽象、继承、多态），可以实现很多复杂的设计思路，是很多<strong>设计原则、设计模式</strong>编码实现的基础。</p><h3 id="_02-面向对象四大特性" tabindex="-1"><a class="header-anchor" href="#_02-面向对象四大特性"><span>02|面向对象四大特性</span></a></h3><h4 id="_1-封装-encapsulation" tabindex="-1"><a class="header-anchor" href="#_1-封装-encapsulation"><span>1. 封装（Encapsulation）</span></a></h4><ul><li><p>WHAT:封装也叫作信息隐藏或者数据访问保护。类通过暴露有限的访问接口，授权外部仅能通过类提供的方式来访问内部信息或者数据。它需要编程语言提供权限访问控制语法来支持，例如 Java 中的 private、protected、public 关键字。</p></li><li><p>存在的意义: 封装特性一方面是<strong>保护数据不被随意修改</strong>，提高代码的可维护性；另一方面是仅暴露有限的必要接口，<strong>提高类的易用性。</strong></p></li></ul><h4 id="_2-抽象-abstraction" tabindex="-1"><a class="header-anchor" href="#_2-抽象-abstraction"><span>2. 抽象（Abstraction）</span></a></h4><ul><li>WHAT:封装主要讲的是如何隐藏信息、保护数据，而抽象讲的是<strong>如何隐藏方法的具体实现</strong>，让调用者只需要关心方法提供了哪些功能，并不需要知道这些功能是如何实现的。(通过接口Interface和抽象类abstract实现)。</li><li>WHY:在面对复杂系统的时候，人脑能承受的信息复杂程度是有限的，所以我们必须忽略掉一些非关键性的实现细节。而抽象作为一种只关注功能点不关注实现的设计思路，正好帮我们的大脑过滤掉许多非必要的信息。换一个角度来考虑，我们在定义（或者叫命名）类的方法的时候，也要有抽象思维，不要在方法定义中，暴露太多的实现细节，以保证在某个时间点需要改变方法的实现逻辑的时候，不用去修改其定义。</li><li>存在的意义:一方面是提高代码的可扩展性、维护性，修改实现不需要改变定义，减少代码的改动范围；另一方面，它也是处理复杂系统的有效手段，能有效地过滤掉不必要关注的信息。</li></ul><h4 id="_3-继承-inheritance" tabindex="-1"><a class="header-anchor" href="#_3-继承-inheritance"><span>3. 继承（Inheritance）</span></a></h4><ul><li>WHAT:继承是用来表示类之间的 is-a 关系，分为两种模式：单继承和多继承。单继承表示一个子类只继承一个父类，多继承表示一个子类可以继承多个父类。为了实现继承这个特性，编程语言需要提供特殊的语法机制来支持。继承主要是用来解决代码复用的问题。</li><li>WHY: 代码复用，不过度使用继承，继承层次过深过复杂，就会导致代码可读性、可维护性变差。</li><li>存在的意义：<strong>继承主要是用来解决代码复用的问题。</strong></li></ul><h4 id="_4-多态-polymorphism" tabindex="-1"><a class="header-anchor" href="#_4-多态-polymorphism"><span>4. 多态（Polymorphism）</span></a></h4><ul><li>WHAT:多态是指子类可以替代父类，在代码运行的过程中，调用子类的实现方法。多态这种特性也需要编程语言提供特殊的语法机制来实现，比如继承、接口类、duck-typing。</li><li>存在的意义：多态可以提高代码的<strong>扩展性和复用性</strong>，是很多设计模式、设计原则、编程技巧的代码实现基础。</li></ul><h3 id="_03-面向对象-vs-面向过程-结构化" tabindex="-1"><a class="header-anchor" href="#_03-面向对象-vs-面向过程-结构化"><span>03|面向对象 vs 面向过程(结构化)</span></a></h3><h4 id="_1-面向对象" tabindex="-1"><a class="header-anchor" href="#_1-面向对象"><span>1. 面向对象</span></a></h4><ul><li><strong>面向对象编程</strong>是一种编程范式或者编程风格，<strong>他以类和对象作为组织代码基本单元</strong>，并将封装、抽象、继承、多态四个特性，作为代码设计和实现的基石。</li><li><strong>面向对象编程语言</strong>是支持类或对象的语法机制，并有现成的语法机制，能方便地实现面向对象编程四大特性（封装、抽象、继承、多态）的编程语言。</li></ul><h4 id="_2-面向过程" tabindex="-1"><a class="header-anchor" href="#_2-面向过程"><span>2. 面向过程</span></a></h4><ul><li><strong>面向过程编程</strong>也是一种编程范式或者编程风格，他以过程(功能：方法、函数、操作)为组织代码的基本单元，以数据和方法相分离的方式为主要特点，面向过程风格是一种流程化的编程风格，通过拼接一组顺序执行的方法来操作数据完成一项功能。</li><li><strong>面向过程编程语言</strong>它最大的特点是不支持类和对象两个语法概念，不支持丰富的面向对象编程特性（比如继承、多态、封装），仅支持面向过程编程。</li></ul><h4 id="_3-面向对象编程相比面向过程编程的优势" tabindex="-1"><a class="header-anchor" href="#_3-面向对象编程相比面向过程编程的优势"><span>3. 面向对象编程相比面向过程编程的优势</span></a></h4><ol><li>**OOP 更加能够应对大规模复杂程序的开发:**对于大规模复杂程序的开发，程序的处理流程并非单一的一条主线，而是错综复杂的网状结构。面向对象编程比起面向过程编程，更能应对这种复杂类型的程序开发。</li><li><strong>OOP 风格的代码更易复用、易扩展、易维护</strong>:面向对象编程相比面向过程编程，具有更加丰富的特性（封装、抽象、继承、多态）。利用这些特性编写出来的代码，更加易扩展、易复用、易维护。</li><li>**OOP 语言更加人性化、更加高级、更加智能:**从编程语言跟机器打交道的方式的演进规律中，我们可以总结出：面向对象编程语言比起面向过程编程语言，更加人性化、更加高级、更加智能。</li></ol><h3 id="_04-面向对象分析、设计与编程" tabindex="-1"><a class="header-anchor" href="#_04-面向对象分析、设计与编程"><span>04 | 面向对象分析、设计与编程</span></a></h3><p>面向对象分析（OOA）、面向对象设计（OOD）、面向对象编程（OOP），是面向对象开发的三个主要环节。简单点讲：面向对象分析就是要搞清楚做什么，面向对象设计就是要搞清楚怎么做，面向对象编程就是将分析和设计的的结果翻译成代码的过程。</p><h4 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析"><span>需求分析</span></a></h4><p>需求分析的过程实际上是一个不断迭代优化的过程。我们不要试图一下就给出一个完美的解决方案，而是先给出一个粗糙的、基础的方案，有一个迭代的基础，然后再慢慢优化。这样一个思考过程能让我们摆脱无从下手的窘境。</p><ol><li>给出需求分析基础方案</li><li>经过多轮分析优化</li><li>给出用例图，给出需求描述</li></ol><h4 id="面向对象设计" tabindex="-1"><a class="header-anchor" href="#面向对象设计"><span>面向对象设计</span></a></h4><p>面向对象设计和实现要做的事情就是把合适的代码放到合适的类中。至于到底选择哪种划分方法，判定的标准是让代码尽量地满足“松耦合、高内聚”、单一职责、对扩展开放对修改关闭等各种设计原则和思想，尽量地做到代码可复用、易读、易扩展、易维护。</p><p>面向对象分析的产出是详细的需求描述。面向对象设计的产出是类。在面向对象设计这一环节中，我们将需求描述转化为具体的类的设计。这个环节的工作可以拆分为下面四个部分。</p><ol><li><p>划分职责进而识别出有哪些类</p><ul><li><p>根据需求描述和用例，分解成功能点，一条一条罗列下来，尽可能小，做到单一职责。</p></li><li><p>根据功能点，总结归纳出核心类。</p></li></ul></li><li><p>定义类及其属性和方法</p><ul><li>根据描述中出现的名词作为候选属性，进行过滤与筛选，此外，还要挖掘一些没有出现在功能点描述中属性如createTime，以及描述中没有出现的方法如getToken</li></ul></li><li><p>定义类与类之间的交互关系</p><ul><li>UML 统一建模语言中定义了六种类之间的关系。它们分别是：<strong>泛化、实现、关联、聚合、组合、依赖</strong>。我们从更加贴近编程的角度，对类与类之间的关系做了调整，保留了四个关系：泛化、实现、组合、依赖。</li></ul></li><li><p>将类组装起来并提供执行入口</p><ul><li>将所有的类组装在一起，提供一个执行入口。这个入口可能是一个 main() 函数，也可能是一组给外部用的 API 接口。通过这个入口，我们能触发整个代码跑起来。</li></ul></li></ol><h3 id="_05-接口-vs-抽象类" tabindex="-1"><a class="header-anchor" href="#_05-接口-vs-抽象类"><span>05 | 接口 VS 抽象类</span></a></h3><p>什么时候该用抽象类？什么时候该用接口？实际上，判断的标准很简单。如果要表示一种 is-a 的关系，并且是为了解决代码复用问题，我们就用抽象类；如果要表示\b一种 has-a 关系，并且是为了解决抽象而非代码复用问题，那我们就用接口。</p><h3 id="_06-基于接口而非实现编程" tabindex="-1"><a class="header-anchor" href="#_06-基于接口而非实现编程"><span>06 | 基于接口而非实现编程</span></a></h3><p>应用这条原则，可以将接口和实现相分离，封装不稳定的实现，暴露稳定的接口。上游系统面向接口而非实现编程，不依赖不稳定的实现细节，这样当实现发生变化的时候，上游系统的代码基本上不需要做改动，以此来降低耦合性，提高扩展性。</p><p>越抽象、越顶层、越脱离具体某一实现的设计，越能提高代码的灵活性，越能应对未来的需求变化。好的代码设计，不仅能应对当下的需求，而且在将来需求发生变化的时候，仍然能够在不破坏原有代码设计的情况下灵活应对。而抽象就是提高代码扩展性、灵活性、可维护性最有效的手段之一。</p><h3 id="_07-多用组合少用继承" tabindex="-1"><a class="header-anchor" href="#_07-多用组合少用继承"><span>07 | 多用组合少用继承</span></a></h3><h4 id="_1-为什么不推荐使用继承" tabindex="-1"><a class="header-anchor" href="#_1-为什么不推荐使用继承"><span>1. 为什么不推荐使用继承？</span></a></h4><p>继承是面向对象的四大特性之一，用来表示类之间的 is-a 关系，可以解决代码复用的问题。虽然继承有诸多作用，**但继承层次过深、过复杂，也会影响到代码的可维护性。**在这种情况下，我们应该尽量少用，甚至不用继承。</p><h4 id="_2-组合相比继承有哪些优势" tabindex="-1"><a class="header-anchor" href="#_2-组合相比继承有哪些优势"><span>2. 组合相比继承有哪些优势</span></a></h4><p>继承主要有三个作用：表示 is-a 关系、支持多态特性、代码复用。而这三个作用都可以通过组合、接口、委托三个技术手段来达成。除此之外，利用组合还能<strong>解决层次过深、过复杂的继承关系影响代码可维护性的问题</strong>。</p><h4 id="_3-如何判断该用组合还是继承" tabindex="-1"><a class="header-anchor" href="#_3-如何判断该用组合还是继承"><span>3. 如何判断该用组合还是继承？</span></a></h4><p>如果类之间的继承结构稳定，层次比较浅，关系不复杂，我们就可以大胆地使用继承。反之，我们就尽量使用组合来替代继承。除此之外，还有一些设计模式、特殊的应用场景，会固定使用继承或者组合。</p><h3 id="_08-贫血模型-vs-充血模型" tabindex="-1"><a class="header-anchor" href="#_08-贫血模型-vs-充血模型"><span>08 | 贫血模型 VS 充血模型</span></a></h3><p>我们平时做 Web 项目的业务开发，大部分都是基于贫血模型的 MVC 三层架构。基于贫血模型的传统开发模式，是典型的面向过程的编程风格。相反，基于充血模型的 DDD 开发模式，是典型的面向对象的编程风格。</p><ol><li><p>贫血模型：面向过程，适合不复杂的系统开发</p></li><li><p>充血模型：面向对象，适合业务复杂的系统开发。</p></li><li><p>二者区别：主要区别在service层，Controller层和Repository层代码基本上相同。</p></li></ol><h2 id="三、-设计原则" tabindex="-1"><a class="header-anchor" href="#三、-设计原则"><span>三、 设计原则</span></a></h2><h4 id="_01-solid原则-单一职责-srp-single-responsibility-principle" tabindex="-1"><a class="header-anchor" href="#_01-solid原则-单一职责-srp-single-responsibility-principle"><span>01| SOLID原则：单一职责 SRP（Single Responsibility Principle）</span></a></h4><ul><li><p><strong>概念：</strong> 一个类只负责完成一个职责或者功能。</p></li><li><p><strong>意义：<strong>单一职责原则通过避免设计大而全的类，避免将不相关的功能耦合在一起，<strong>来提高类的内聚性</strong>。同时，类职责单一，类依赖的和被依赖的其他类也会变少，减少了代码的耦合性，以此来实现</strong>代码的高内聚、松耦合</strong>。但是，如果拆分得过细，实际上会适得其反，反倒会降低内聚性，也会影响代码的可维护性。</p><p>TODO: 解释详细的高内聚、低耦合的定义。</p></li><li><p><strong>不满足的5种情况</strong>：</p><ol><li>类中的代码行数、函数或者属性过多：影响代码的可读性和可维护性，我们就需要考虑对类进行拆分；</li><li>类依赖的其他类过多或者依赖类的其他类过多：不符合高内聚、低耦合的设计思想，我们就需要考虑对类进行拆分；</li><li>私有方法过多：我们就要考虑能否将私有方法独立到新的类中，设置为 public 方法，供更多的类使用，从而提高代码的复用性；</li><li>比较难给类起一个合适的名字：难用一个业务名词概括，或者只能用一些笼统的 Manager、Context 之类的词语来命名，这就说明类的职责定义得可能不够清晰；</li><li>类中大量的方法都是集中操作类中的某几个属性。在 UserInfo 中，如果一半的方法都是在操作 address 信息，那就可以考虑将这几个属性和对应的方法拆分出来。</li></ol></li></ul><h4 id="_02-solid原则-开闭原则-ocp-open-closed-principle" tabindex="-1"><a class="header-anchor" href="#_02-solid原则-开闭原则-ocp-open-closed-principle"><span>02| SOLID原则：开闭原则 OCP（Open Closed Principle）</span></a></h4><p>概念：添加一个新的功能，应该是通过在已有代码基础上扩展代码（新增模块、类、方法、属性等），而非修改已有代码（修改模块、类、方法、属性等）的方式来完成。</p><p>03| SOLID原则：里氏替换原则 LSP（Liskov substitution principle）</p><p>04| SOLID原则：接口隔离原则 ISP（Interface Segregation Principle）</p><p>05| SOLID原则：依赖倒置原则 DIP（Dependency Inversion Principle）</p><p>06| KISS、YAGNI 原则</p><p>07| DRY 原则</p><p>08| LOD 原则</p>',70)]))}]]),t=JSON.parse('{"path":"/architecture-design/%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99%E4%B8%8E%E6%80%9D%E6%83%B3.html","title":"设计原则与思想","lang":"zh-CN","frontmatter":{"article":true,"title":"设计原则与思想","icon":"fa6-solid:list","order":1,"category":"设计模式","tag":["设计模式"],"description":"设计原则与思想 前言 面向对象、设计原则、设计模式、编程规范、重构技巧之间的关系。 imgimg 面向对象编程因为具有丰富的特性(抽象、封装、继承、多态)，可以实现很多复杂的设计思路，是很多设计原则、设计模式等编码实现的基础。 设计原则是指导我们代码设计的一些经验总结，对与某些场景下，是否应该应用某种设计模式具有指导意义，比如，开闭原则是很多设计模式(...","head":[["meta",{"property":"og:url","content":"https://sciencefl.github.io/architecture-design/%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99%E4%B8%8E%E6%80%9D%E6%83%B3.html"}],["meta",{"property":"og:site_name","content":"FlynnDocs 学习笔记"}],["meta",{"property":"og:title","content":"设计原则与思想"}],["meta",{"property":"og:description","content":"设计原则与思想 前言 面向对象、设计原则、设计模式、编程规范、重构技巧之间的关系。 imgimg 面向对象编程因为具有丰富的特性(抽象、封装、继承、多态)，可以实现很多复杂的设计思路，是很多设计原则、设计模式等编码实现的基础。 设计原则是指导我们代码设计的一些经验总结，对与某些场景下，是否应该应用某种设计模式具有指导意义，比如，开闭原则是很多设计模式(..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://static001.geekbang.org/resource/image/f3/d3/f3262ef8152517d3b11bfc3f2d2b12d3.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-05T08:51:01.000Z"}],["meta",{"property":"article:tag","content":"设计模式"}],["meta",{"property":"article:modified_time","content":"2024-12-05T08:51:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"设计原则与思想\\",\\"image\\":[\\"https://static001.geekbang.org/resource/image/f3/d3/f3262ef8152517d3b11bfc3f2d2b12d3.png\\"],\\"dateModified\\":\\"2024-12-05T08:51:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Flynn\\",\\"url\\":\\"https://sciencefl.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"一、代码质量评判标准","slug":"一、代码质量评判标准","link":"#一、代码质量评判标准","children":[{"level":3,"title":"01|如何评价代码质量的高低？","slug":"_01-如何评价代码质量的高低","link":"#_01-如何评价代码质量的高低","children":[]},{"level":3,"title":"02|最常用的评价标准","slug":"_02-最常用的评价标准","link":"#_02-最常用的评价标准","children":[]},{"level":3,"title":"03|如何写出高质量的代码：","slug":"_03-如何写出高质量的代码","link":"#_03-如何写出高质量的代码","children":[]}]},{"level":2,"title":"二、面向对象","slug":"二、面向对象","link":"#二、面向对象","children":[{"level":3,"title":"01|面向对象概述","slug":"_01-面向对象概述","link":"#_01-面向对象概述","children":[]},{"level":3,"title":"02|面向对象四大特性","slug":"_02-面向对象四大特性","link":"#_02-面向对象四大特性","children":[]},{"level":3,"title":"03|面向对象 vs 面向过程(结构化)","slug":"_03-面向对象-vs-面向过程-结构化","link":"#_03-面向对象-vs-面向过程-结构化","children":[]},{"level":3,"title":"04 | 面向对象分析、设计与编程","slug":"_04-面向对象分析、设计与编程","link":"#_04-面向对象分析、设计与编程","children":[]},{"level":3,"title":"05 | 接口 VS 抽象类","slug":"_05-接口-vs-抽象类","link":"#_05-接口-vs-抽象类","children":[]},{"level":3,"title":"06 | 基于接口而非实现编程","slug":"_06-基于接口而非实现编程","link":"#_06-基于接口而非实现编程","children":[]},{"level":3,"title":"07 | 多用组合少用继承","slug":"_07-多用组合少用继承","link":"#_07-多用组合少用继承","children":[]},{"level":3,"title":"08 | 贫血模型 VS 充血模型","slug":"_08-贫血模型-vs-充血模型","link":"#_08-贫血模型-vs-充血模型","children":[]}]},{"level":2,"title":"三、 设计原则","slug":"三、-设计原则","link":"#三、-设计原则","children":[]}],"git":{"createdTime":1732612569000,"updatedTime":1733388661000,"contributors":[{"name":"fuliang","email":"fuliang@ssc-hn.com","commits":6}]},"readingTime":{"minutes":15.88,"words":4764},"filePathRelative":"architecture-design/设计原则与思想.md","localizedDate":"2024年11月26日","excerpt":"\\n<h2>前言</h2>\\n<p>面向对象、设计原则、设计模式、编程规范、重构技巧之间的关系。</p>\\n<figure><img src=\\"https://static001.geekbang.org/resource/image/f3/d3/f3262ef8152517d3b11bfc3f2d2b12d3.png\\" alt=\\"img\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>img</figcaption></figure>\\n<ul>\\n<li>面向对象编程因为具有丰富的特性(抽象、封装、继承、多态)，可以实现很多复杂的设计思路，是很多设计原则、设计模式等编码实现的基础。</li>\\n<li>设计原则是指导我们代码设计的一些经验总结，对与某些场景下，是否应该应用某种设计模式具有指导意义，比如，开闭原则是很多设计模式(策略、模板等)的指导原则。</li>\\n<li>设计模式是针对软件开发过程中常遇到一些设计问题，总结出来的一套解决方案或者设计思路。应用设计模式的主要目的是<strong>提高代码的可扩展性</strong>。从抽象程度上来说，设计原则比设计模式更抽象。设计模式更加具体、更加可执行。</li>\\n<li>编程规范主要解决的是代码的<strong>可读性问题</strong>。编码规范相对于设计原则、设计模式，更加具体、更加偏重代码细节、更加能落地。持续的小重构依赖的理论基础主要就是编程规范。</li>\\n<li>重构作为保持代码质量不下降的有效手段，利用的就是面向对象、设计原则、设计模式、编码规范这些理论。</li>\\n</ul>","autoDesc":true}')}}]);