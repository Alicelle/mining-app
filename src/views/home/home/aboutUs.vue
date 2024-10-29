<template>
  <div class="about-us">
    <div class="introduce">
      <div class="title">Our Business</div>
      <div class="content">
        Alcoa, referred to as Alcoa, is the world's third largest aluminum
        producer after Rio Tinto Group and Rusal Group, was founded in 1888 by
        Charles Martin Hall, now listed on the New York Stock Exchange.
        Headquartered in Pittsburgh, Pennsylvania, Alcoa oversees operations in
        44 countries. It was followed by Alcan, a former subsidiary of the
        Canadian Aluminium Group. In terms of sales, Alcan overtook Alcoa.
      </div>
    </div>
    <div class="main-pic">
      <img class="pic" src="/src/assets/images/home/about-us-pic1.png" alt="" />
    </div>
    <div class="introduce">
      <div class="content">
        Integrate operational excellence and innovation to build a resilient
        future At Alcoa, our unwavering commitment to innovation and adherence
        to best practices is a cornerstone of our sustainability strategy. Our
        range of emerging green technologies in aluminum smelting and our low
        carbon Sustana "A" "M product portfolio are testament to this
        dedication. By constantly pushing the boundaries of technology and
        adopting responsible business practices, we strive to have a positive
        impact on the environment and society.
      </div>
    </div>
    <div class="main-pic">
      <img class="pic" src="@/assets/images/home/about-us-pic2.png" alt="" />
    </div>
    <div class="introduce">
      <div class="content">
        Alcoa's annual Sustainability Report provides an in-depth analysis of
        our environmental, social and governance (ESG) performance in achieving
        our public goals. The report covers the topics that are most relevant to
        our stakeholders and our business across the value chain, as well as our
        ongoing investment in local communities.
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.about-us {
  padding: 17px 20px;
  .main-pic {
    margin-bottom: 30px;
    .pic {
      width: 100%;
    }
  }
  .introduce {
    .title {
      font-size: 18px;
      color: #3fc186;
      line-height: 25px;
      margin-bottom: 8px;
    }
    .sub-title {
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
      margin-bottom: 10px;
    }
    .content {
      font-size: 14px;
      color: #afafaf;
      line-height: 25px;
      margin-bottom: 40px;
    }
  }
}
</style>
