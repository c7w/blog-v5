---
title: "[Done Right] Mixture-of-Expert Done Right"
mathjax: true
pubDate: 2025-09-01 19:20:22
categories:
- Notes
---

之后会把一些阅读后的内容总结以问题的形式 Post 出来，称为 Done Right 系列。

## 正文

1.  MoE 在时间、空间、表现上，相比 Dense Model 分别是否带来了优势？
2.  MoE 在训练和推理阶段各自带来了哪些挑战？
3.  基于 https://github.com/karpathy/nanoGPT 的 `model.py`，改一份 MoE 并成功训练 Noisy Top-k Gating MoE。
    1.  需要逐 expert 去 aggregate tokens，然后一次 forward。
4.  Switch Transformer / GShard 中为了门控函数的负载均衡与高效，设计了哪些机制？
    1.  专家容量是什么？
    2.  辅助损失怎么实现？
    3.  第 2 大概率的专家为什么要随机路由？
5.  在微调 MoE 模型的时候，有哪些有趣的观察？
    1.  更容易过拟合？在知识密集和推理密集任务上，相比 Dense Model 的表现？
    2.  部分参数微调？
    3.  微调超参数的设置？
6.  后续 MoE 有哪些有趣的工作？
    1.  FasterMoE：Motivation 是什么？工作的贡献是什么？
    2.  MegaBlocks：Motivation 是什么？工作的贡献是什么？
    3.  DeepSeekMoE 的实现？细粒度专家切分、共享专家隔离分别做了什么？DeepSeek-V3 的负载均衡策略是什么？
7.  画下面的计算图。
    1.  Single-core: Mixture-of-Expert Block 计算图
    2.  Two Cores: 数据并行
    3.  Two Cores: Expert 并行（是否有意义？）
    4.  Two Cores: 数据并行 + Expert 并行
    5.  Two Cores: Expert 并行 + Tensor 并行
    6.  Four Cores: 数据并行 + Expert 并行 + Pipeline 并行
    7.  Four Cores: 数据并行 + Expert 并行 + Tensor 并行

## Reference

-   https://huggingface.co/blog/moe#what-is-a-mixture-of-experts-moe
-   https://huggingface.co/spaces/Ki-Seki/ultrascale-playbook-zh-cn
-   https://arxiv.org/pdf/2006.16668
