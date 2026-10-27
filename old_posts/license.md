---
title: 常见开源协议简介
pubDate: 2023-6-12 10:00:00
categories:
- Learning
---

开源协议是为了保护软件的开发者和使用者的权益，同时促进软件的普及和发展。通过**开源协议**，开发者可以公开软件的源代码，并**对使用者授予一定的权利和自由**，同时也**对使用者设定一些限制**，以确保软件的持续发展和使用。

本文章我们尝试对一些常见的开源协议的内容进行梳理整合。



## GPLv3

GNU GPLv3：GNU General Public License v3.0

> GPLv3 is **viral**, so it infects any replicating [modified] code with the license, such that the sources for said modifications, if any, must be available.
>
> ```
> TL; DR ver.
> 1. Anyone can copy, modify and distribute this software.
> 2. You have to include the license and copyright notice with each and every distribution.
> 3. You can use this software privately.
> 4. You can use this software for commercial purposes.
> 5. If you dare build your business solely from this code, you risk open-sourcing the whole code base.
> 6. If you modify it, you have to indicate changes made to the code.
> 7. Any modifications of this code base MUST be distributed with the same license, GPLv3.
> 8. This software is provided without warranty.
> 9. The software author or license can not be held liable for any damages inflicted by the software.
> ```

【您可以...】可商用，可对许可材料（licensed material, e.g. source code）修改、再分发，可私用，许可材料的贡献者可申请专利

【只需要...】再分发时需要分发源代码（不能仅分发可执行文件）并标明 License，任何修改都要采用同一 License，任何修改都需指出修改处

【免责声明】不保证可用、不承担责任



## AGPLv3

GNU AGPLv3：GNU Affero General Public License v3.0

这个协议的存在是为了弥补 GPL 协议存在的“缺陷”，即要求软件“发布” 才必须开源。如果是一些提供云计算、云服务的商业模式，这里并没有涉及到软件的“发布”，自然就不受 GPL 协议的约束。而 AGPL 协议增加了一点约束：如果使用 AGPL 许可的软件与用户通过网络进行交互，则也需要满足上述 GPL 协议中的条款。

> AGPL is like the GPL, but the GPL is only triggered if you distribute your derivative work. **AGPL broadens this trigger to activate if you let people use your derivative work over a network.**



## LGPLv3

GNU LGPLv3：GNU Lesser General Public License v3.0

LGPL 是主要为类库（Libraries）使用而设计的开源协议。LGPL 允许商业软件通过动态链接方式使用 LGPL 类库而不需要开源商业软件的代码。这使得采用 LGPL 协议的开源代码可以被商业软件作为类库引用并发布和销售。

但是，如果是改运行库本身，还需要遵守上述 GPL 协议的条款。仅仅是类库的调用方可以不被协议约束。



## Apache License 2.0

【您可以...】可商用，可对许可材料（licensed material, e.g. source code）修改、再分发，可私用，许可材料的贡献者可申请专利

【只需要...】再分发时需要标明 License，任何修改都需指出修改处

【免责声明】不保证可用、不承担责任、不允许注册商标

这个协议被 Android App 广泛使用，其再分发时不一定需要遵守同样的协议。

简而言之，再分发时需要给代码使用者一份同样的 License；如果修改了代码，需要在被修改的文件中说明，同时必须保持原先代码中的协议、商标、专利等说明。



## BSD License

BSD 开源协议的使用需要满足以下条件：

- 如果再分发的产品中包含源代码，则必须带有同一份 BSD 协议。
- 如果再分发的只是二进制类库/可执行文件，则需要在文档 / 版权声明中包含同一份 BSD 协议。
- 不可以用开源代码的作者 / 机构名字和原来产品的名字做市场推广。

在满足上述条件的基础上，使用者可以自由的使用与修改源代码，也可以将修改后的代码作为开源或者专有软件再发布。



## MIT License

MIT License 相对 BSD License 更宽松，取消了上述“市场推广”条目的限制。也就是说，除了以下两点，MIT License 都是自由的：

- 如果再分发的产品中包含源代码，则必须带有同一份 MIT 协议。
- 如果再分发的只是二进制类库/可执行文件，则需要在文档 / 版权声明中包含同一份 MIT 协议。



## Mozilla Public License 2.0

【您可以...】可商用，可对许可材料（licensed material, e.g. source code）修改、再分发，可私用，许可材料的贡献者可申请专利

【只需要...】再分发时必须提供源代码、需要标明 License，使用 MPL License 的文件必须以 MPL License 再分发

【免责声明】不保证可用、不承担责任、不允许注册商标

注意这里“使用 MPL License 的文件必须以 MPL License 再分发”可以允许在现有 codebase 的基础上添加一个 MPL 协议的模块，除了这个模块需要以 MPL License 对外许可之外，codebase 中的其他代码不需使用 MPL 协议强制对外许可。

此外，所有再发布者都要用一个专门的文件对源代码程序修改的时间和修改的方式有描述。




## Reference

- https://choosealicense.com/licenses/
- **https://choosealicense.com/appendix/**