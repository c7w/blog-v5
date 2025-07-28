---
title: Diffusion-DPO 公式推导
mathjax: true
pubDate: 2024-8-27 21:30:29
categories:
- Learning
---



# 数学推导

在这篇笔记中我们给出 Diffusion DPO 的推导，推导过程参考了 [1] 的内容。

## Diffusion DPO Loss Objective

我们先给出我们终极的推导目标。

$$
L(\theta) = -\mathbb{E}_{(x_0^w, x_0^l) \sim \mathcal{D}, t \sim \mathcal{U}(0, T), x_t^w \sim q(x_t^w|x_0^w), x_t^l \sim q(x_t^l|x_0^l)} \\
\log \sigma \left( -\beta T \omega(\lambda_t) \left( 
\| \epsilon^w - \epsilon_\theta(x_t^w, t) \|_2^2 - \| \epsilon^w - \epsilon_{\text{ref}}(x_t^w, t) \|_2^2 
- \left( \| \epsilon^l - \epsilon_\theta(x_t^l, t) \|_2^2 - \| \epsilon^l - \epsilon_{\text{ref}}(x_t^l, t) \|_2^2 \right) 
\right) \right)
$$

## From RLHF to DPO

我们先介绍 Bradley-Terry 模型，它将人类偏好 $x_0^w$ over $x_0^l$ 这件事用一个 Sigmoid 函数来建模：

$$
\begin{equation}p_{\text{BT}}(x_0^w \succ x_0^l \mid c) = \sigma \left( r(c, x_0^w) - r(c, x_0^l) \right)\end{equation}
$$

这里 r 是一个 reward model，用来衡量 $x_0^*$ 与 $c$ 和人类偏好的符合程度。一个很自然的 idea 就是把 r 用另一个 pretrained 知识源来替代，比如随便搜了一下发现有很多 CLIP-DPO。如果没有这个外部的 r 函数，也可以用 data-driven 的方式学一个 r 函数出来：

$$
\begin{equation}L_{\text{BT}}(\phi) = -\mathbb{E}_{c, x_0^w, x_0^l} \left[ \log \sigma \left( r_{\phi}(c, x_0^w) - r_{\phi}(c, x_0^l) \right) \right]\end{equation}
$$

有了 r 函数之后，我们定义 RLHF 是一个对生成式模型 $p_\theta(\mathbf{x}_0|\mathbf{c})$ 训练过程，这个过程可以使得我们通过上述方式定义的 reward function $r(\mathbf{c}, \mathbf{x}_0)$ 在微调后的生成分布上取得较大的值，同时通过 KL-Divergence 约束微调导致的分布偏移量并不大：

$$
\max_{p_\theta} \mathbb{E}_{\mathbf{c} \sim \mathcal{D}_c, \mathbf{x}_0 \sim p_\theta(\mathbf{x}_0|\mathbf{c})} \left[r(\mathbf{c}, \mathbf{x}_0)\right]    - \beta \, \text{KL}\left[p_\theta(\mathbf{x}_0|\mathbf{c}) \| p_{\text{ref}}(\mathbf{x}_0|\mathbf{c})\right]
$$

这个 RLHF 的极点事实上是有闭式解的，可以将其表示为：

$$
\begin{aligned}\operatorname*{max}_{\pi}\mathbb{E}_{x\sim\mathcal{D},y\sim\pi}& \left[r(x,y)\right]-\beta\mathbb{D}_{\mathrm{KL}}\left[\pi(y|x)\parallel\pi_{\mathrm{ref}}(y|x)\right] \\&=\max_\pi\mathbb{E}_{x\sim\mathcal{D}}\mathbb{E}_{y\sim\pi(y|x)}\left[r(x,y)-\beta\log\frac{\pi(y|x)}{\pi_{\mathrm{ref}}(y|x)}\right] \\&=\min_{\pi}\mathbb{E}_{x\sim\mathcal{D}}\mathbb{E}_{y\sim\pi(y|x)}\left[\log\frac{\pi(y|x)}{\pi_{\mathrm{ref}}(y|x)}-\frac{1}{\beta}r(x,y)\right] \\&=\min_{\pi}\mathbb{E}_{x\sim\mathcal{D}}\mathbb{E}_{y\sim\pi(y|x)}\left[\log\frac{\pi(y|x)}{\frac{1}{Z(x)}\pi_{\mathrm{ref}}(y|x)\exp\left(\frac{1}{\beta}r(x,y)\right)}-\log Z(x)\right]\end{aligned}
$$

这里 KL Divergence 在对 y 取期望的意义下展开。Z(x) 是归一化函数（原文将其称为 partition function）：

$$
Z(x)=\sum_y\pi_\text{ref}(y|x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

由于 $\log Z(x)$ 项与 $\pi$ 无关，让这个熵最小等价于分子和分母两个分布完全相同，即：

$$
\pi^*(y|x)=\frac{1}{Z(x)}\pi_{\text{ref}}(y|x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

换元回生成式模型的表示：

$$
p_\theta^*(\boldsymbol{x}_0|\boldsymbol{c})=p_{\mathrm{ref}}(\boldsymbol{x}_0|\boldsymbol{c})\exp\left(r(\boldsymbol{c},\boldsymbol{x}_0)/\beta\right)/Z(\boldsymbol{c})
$$

因此，可以移项表示 reward function：

$$
r(\boldsymbol{c},\boldsymbol{x}_0)=\beta\log\frac{p_\theta^*(\boldsymbol{x}_0|\boldsymbol{c})}{p_\text{ref}(\boldsymbol{x}_0|\boldsymbol{c})}+\beta\log Z(\boldsymbol{c})
$$

代入 $L_{\text{BT}}(\phi)$ 中，我们发现模型参数 $\theta$ 本身变成了一个 reward model：

$$
L_{\mathrm{DPO}}(\theta)=-\mathbb{E}_{\boldsymbol{c},\boldsymbol{x}_{0}^{w},\boldsymbol{x}_{0}^{l}}\left[\log\sigma\left(\beta\log\frac{p_{\theta}(\boldsymbol{x}_{0}^{w}|\boldsymbol{c})}{p_{\mathrm{ref}}(\boldsymbol{x}_{0}^{w}|\boldsymbol{c})}-\beta\log\frac{p_{\theta}(\boldsymbol{x}_{0}^{l}|\boldsymbol{c})}{p_{\mathrm{ref}}(\boldsymbol{x}_{0}^{l}|\boldsymbol{c})}\right)\right]
$$

## DPO on Diffusion

在这个阶段，最大的挑战是 $p_\theta(\boldsymbol{x}_0|\boldsymbol{c})$ 可以由 $p(\boldsymbol{x}_T)$ 由多条 Diffusion Path 生成出来，于是我们重新利用 Diffusion 利用 ELBO 的想法，我们将奖励函数定义在 $\boldsymbol{x}_{0:T}$ 上： 

$$
r(\boldsymbol{c},\boldsymbol{x}_0)=\mathbb{E}_{p_\theta(\boldsymbol{x}_{1:T}|\boldsymbol{x}_0,\boldsymbol{c})}\left[R(\boldsymbol{c},\boldsymbol{x}_{0:T})\right].
$$

这样定义下的 RLHF 过程，应该满足：

$$
\max_{p_{\theta}}\mathbb{E}_{\boldsymbol{c}\sim\mathcal{D}_{c},\boldsymbol{x}_{0:T}\sim p_{\theta}(\boldsymbol{x}_{0:T}|\boldsymbol{c})}\left[r(\boldsymbol{c},\boldsymbol{x}_{0})\right]-\beta\mathbb{D}_{\mathrm{KL}}\left[p_{\theta}(\boldsymbol{x}_{0:T}|\boldsymbol{c})\|p_{\mathrm{ref}}(\boldsymbol{x}_{0:T}|\boldsymbol{c})\right]
$$

我们也可以为这个过程推导出 DPO 的 Loss 函数：

$$
L_{\mathrm{DPO-Diffusion}}(\theta)=-\mathbb{E}_{(\boldsymbol{x}_{0}^{w},\boldsymbol{x}_{0}^{t})\sim\mathcal{D}}\log\sigma\bigg(\beta\mathbb{E}_{\boldsymbol{x}_{1:T}^{w}\sim p_{\theta}(\boldsymbol{x}_{1:T}^{w}|\boldsymbol{x}_{0}^{w})}\left[\log\frac{p_{\theta}(\boldsymbol{x}_{0:T}^{w})}{p_{\mathrm{ref}}(\boldsymbol{x}_{0:T}^{w})}-\log\frac{p_{\theta}(\boldsymbol{x}_{0:T}^{l})}{p_{\mathrm{ref}}(\boldsymbol{x}_{0:T}^{l})}\right]\bigg)
$$

接下来我们做两个优化。

第一个是解决这需要优化多个时间步的问题。通过和 Diffusion 推导过程类似的 ELBO 推导，我们得到：

$$
L_{\mathrm{DPO-Diffusion}}(\theta)\leq-\mathbb{E}_{(\boldsymbol{x}_{0}^{w},\boldsymbol{x}_{0}^{l})\sim\mathcal{D},t\sim\mathcal{U}(0,T),\boldsymbol{x}_{t-1,t}^{w}\sim p_{\theta}(\boldsymbol{x}_{t-1,t}^{w}|\boldsymbol{x}_{0}^{w}),\boldsymbol{x}_{t-1,t}^{l}\sim p_{\theta}(\boldsymbol{x}_{t-1,t}^{l}|\boldsymbol{x}_{0}^{l})}\\\log\sigma\left(\beta T\log\frac{p_{\theta}(\boldsymbol{x}_{t-1}^{w}|\boldsymbol{x}_{t}^{w})}{p_{\mathrm{ref}}(\boldsymbol{x}_{t-1}^{w}|\boldsymbol{x}_{t}^{w})}-\beta T\log\frac{p_{\theta}(\boldsymbol{x}_{t-1}^{l}|\boldsymbol{x}_{t}^{l})}{p_{\mathrm{ref}}(\boldsymbol{x}_{t-1}^{l}|\boldsymbol{x}_{t}^{l})}\right)
$$

然后是 $p_\theta(x_{t-1},x_t|x_0,c)$ 不可解的问题，我们使用 $q$ 过程来对这个取变量算期望的过程做估计：

$$
\begin{aligned}L(\theta)=-& \mathbb{E}_{(\boldsymbol{x}_{0}^{w},\boldsymbol{x}_{0}^{l})\sim\mathcal{D},t\sim\mathcal{U}(0,T),\boldsymbol{x}_{t}^{w}\sim q(\boldsymbol{x}_{t}^{w}|\boldsymbol{x}_{0}^{w}),\boldsymbol{x}_{t}^{l}\sim q(\boldsymbol{x}_{t}^{l}|\boldsymbol{x}_{0}^{l})} \\&\log\sigma(-\beta T( \\&+\mathbb{D}_{\mathrm{KL}}(q(\boldsymbol{x}_{t-1}^w|\boldsymbol{x}_{0,t}^w)\|p_\theta(\boldsymbol{x}_{t-1}^w|\boldsymbol{x}_t^w)) \\&-\mathbb{D}_{\mathrm{KL}}(q(\boldsymbol{x}_{t-1}^w|\boldsymbol{x}_{0,t}^w)\|p_{\mathrm{ref}}(\boldsymbol{x}_{t-1}^w|\boldsymbol{x}_t^w)) \\&-\mathbb{D}_{\mathrm{KL}}(q(\boldsymbol{x}_{t-1}^l|\boldsymbol{x}_{0,t}^l)\|p_\theta(\boldsymbol{x}_{t-1}^l|\boldsymbol{x}_t^l)) \\&+\mathbb{D}_{\mathrm{KL}}(q(\boldsymbol{x}_{t-1}^l|\boldsymbol{x}_{0 t}^l)\|p_{\mathrm{ref}}(\boldsymbol{x}_{t-1}^l|\boldsymbol{x}_{t}^l))).\end{aligned}
$$

根据 Diffusion Loss 的推导，这可以被写成：

$$
L(\theta) =-\mathbb{E}_{(\boldsymbol{x}_{0}^{w},\boldsymbol{x}_{0}^{l})\sim\mathcal{D},t\sim\mathcal{U}(0,T),\boldsymbol{x}_{t}^{w}\sim q(\boldsymbol{x}_{t}^{w}|\boldsymbol{x}_{0}^{w}),\boldsymbol{x}_{t}^{l}\sim q(\boldsymbol{x}_{t}^{l}|\boldsymbol{x}_{0}^{l})} \\\log\sigma\left(-\beta T\omega(\lambda_{t})\right)( \|\epsilon^w-\epsilon_\theta(\boldsymbol{x}_t^w,t)\|_2^2-\|\epsilon^w-\epsilon_{\mathrm{ref}}(\boldsymbol{x}_t^w,t)\|_2^2 -\left(\|\boldsymbol{\epsilon}^{l}-\boldsymbol{\epsilon}_{\theta}(\boldsymbol{x}_{t}^{l},t)\|_{2}^{2}-\|\boldsymbol{\epsilon}^{l}-\boldsymbol{\epsilon}_{\mathrm{ref}}(\boldsymbol{x}_{t}^{l},t)\|_{2}^{2}\right)\Big)\Big)
$$

## Reference

[1] Wallace B, Dang M, Rafailov R, et al. Diffusion model alignment using direct preference optimization[C]//Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition. 2024: 8228-8238.

[2] Rafailov R, Sharma A, Mitchell E, et al. Direct preference optimization: Your language model is secretly a reward model[J]. Advances in Neural Information Processing Systems, 2024, 36.