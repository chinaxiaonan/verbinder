import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommunicationService } from '../communication.service';
import * as d3 from 'd3';

@Component({
    selector: 'app-kgraph',
    templateUrl: './kgraph.component.html',
    styleUrls: ['./kgraph.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class KgraphComponent implements OnInit {
    nodes: Array<any>;
    links: Array<any>;
    datas: any;
    simulation: any;

    constructor(private comm: CommunicationService) { }

    ngOnInit() {
        this.nodes = [];
        this.links = [];
        this.datas = this.comm.getDatas();
        //this.datas = JSON.parse('[{"source":{"name":"tttt1","type":0},"target":{"name":"aaaa","type":1},"rela":"Requires"},{"source":{"name":"tttt1","type":0},"target":{"name":"BU","type":2},"rela":"Contacts"},{"source":{"name":"tttt1","type":0},"target":{"name":"Manufacture","type":3},"rela":"Belongs"},{"source":{"name":"tttt1","type":0},"target":{"name":"故障解决方案","type":4},"rela":"Expects"},{"source":{"name":"tttt1","type":0},"target":{"name":"领域设备列表","type":5},"rela":"Has"},{"source":{"name":"tttt1","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"预测性维护","type":0},"target":{"name":"制造业","type":3},"rela":"Belongs"},{"source":{"name":"预测性维护","type":0},"target":{"name":"机械故障告警","type":4},"rela":"Expects"},{"source":{"name":"预测性维护","type":0},"target":{"name":"测点历史数据","type":5},"rela":"Has"},{"source":{"name":"预测性维护","type":0},"target":{"name":"测点实时数据","type":5},"rela":"Has"},{"source":{"name":"预测性维护","type":0},"target":{"name":"传感器拓扑图","type":6},"rela":"Uses"},{"source":{"name":"预测性维护","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"火力发电","type":3},"rela":"Belongs"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"故障解决方案","type":4},"rela":"Expects"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"故障案例文档","type":5},"rela":"Has"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"领域设备列表","type":5},"rela":"Has"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"自然语言处理","type":6},"rela":"Uses"},{"source":{"name":"智能工业诊断","type":0},"target":{"name":"信息检索","type":6},"rela":"Uses"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"制造业","type":3},"rela":"Belongs"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"工件寿命数值","type":4},"rela":"Expects"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"设备更换记录","type":5},"rela":"Has"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"设备工艺参数","type":5},"rela":"Has"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"设备价值","type":5},"rela":"Has"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"生产利润","type":5},"rela":"Has"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"工件寿命预测","type":0},"target":{"name":"对抗生成网络","type":6},"rela":"Uses"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"环境保护","type":3},"rela":"Belongs"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"空气质量数值","type":4},"rela":"Expects"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"历史气象数据","type":5},"rela":"Has"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"实时环境监测数据","type":5},"rela":"Has"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"污染物来源数据","type":5},"rela":"Has"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"空气质量预测","type":0},"target":{"name":"深度神经网络","type":6},"rela":"Uses"},{"source":{"name":"产品质量优化","type":0},"target":{"name":"制造业","type":3},"rela":"Belongs"},{"source":{"name":"产品质量优化","type":0},"target":{"name":"最优生产参数","type":4},"rela":"Expects"},{"source":{"name":"产品质量优化","type":0},"target":{"name":"生产参数记录","type":5},"rela":"Has"},{"source":{"name":"产品质量优化","type":0},"target":{"name":"产品质量记录","type":5},"rela":"Has"},{"source":{"name":"产品质量优化","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"建筑","type":3},"rela":"Belongs"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"最优配置参数","type":4},"rela":"Expects"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"环境数据","type":5},"rela":"Has"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"楼宇信息","type":5},"rela":"Has"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"参数控制","type":5},"rela":"Has"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"楼宇暖风节能","type":0},"target":{"name":"强化学习","type":6},"rela":"Uses"},{"source":{"name":"工业节能","type":0},"target":{"name":"制造业","type":3},"rela":"Belongs"},{"source":{"name":"工业节能","type":0},"target":{"name":"最优配置参数","type":4},"rela":"Expects"},{"source":{"name":"工业节能","type":0},"target":{"name":"环境数据","type":5},"rela":"Has"},{"source":{"name":"工业节能","type":0},"target":{"name":"设备相关数据","type":5},"rela":"Has"},{"source":{"name":"工业节能","type":0},"target":{"name":"系统控制参数","type":5},"rela":"Has"},{"source":{"name":"工业节能","type":0},"target":{"name":"机器学习","type":6},"rela":"Uses"},{"source":{"name":"工业节能","type":0},"target":{"name":"强化学习","type":6},"rela":"Uses"},{"source":{"name":"设计思维研讨会","type":0},"target":{"name":"建筑","type":3},"rela":"Belongs"},{"source":{"name":"设计思维研讨会","type":0},"target":{"name":"未来工作方向","type":4},"rela":"Expects"},{"source":{"name":"设计思维研讨会","type":0},"target":{"name":"行业现状介绍","type":5},"rela":"Has"},{"source":{"name":"设计思维研讨会","type":0},"target":{"name":"从业者远期目标","type":5},"rela":"Has"},{"source":{"name":"设计思维研讨会","type":0},"target":{"name":"从业者具体问题讨论","type":5},"rela":"Has"},{"source":{"name":"设计思维研讨会","type":0},"target":{"name":"讨论","type":6},"rela":"Uses"},{"source":{"name":"工业产品交互设计","type":0},"target":{"name":"制造业","type":3},"rela":"Belongs"},{"source":{"name":"工业产品交互设计","type":0},"target":{"name":"新交互界面","type":4},"rela":"Expects"},{"source":{"name":"工业产品交互设计","type":0},"target":{"name":"产品信息","type":5},"rela":"Has"},{"source":{"name":"工业产品交互设计","type":0},"target":{"name":"目标使用群体","type":5},"rela":"Has"},{"source":{"name":"工业产品交互设计","type":0},"target":{"name":"当前痛点","type":5},"rela":"Has"},{"source":{"name":"工业产品交互设计","type":0},"target":{"name":"设计","type":6},"rela":"Uses"}]');
    }

    ngAfterViewInit() {
        this.drawGraph();
    }

    drawGraph() {
        const svg = d3.select('svg').attr('width', window.innerWidth).attr('height', window.innerHeight).call(d3.zoom().scaleExtent([0.2, 3]).on('zoom', this.zoomed));
        this.simulation = d3.forceSimulation()
            //.force('link', d3.forceLink().id(d=>d.id).distance(180))
            .force('charge_force', d3.forceManyBody().strength(-200))
            .force('center_force', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
        const resp = this.fillData();
        this.nodes = resp.nodes;
        this.links = resp.links;

        this.simulation.nodes(this.nodes);

        const linkforce = d3.forceLink(this.links).distance(150);
        this.simulation.force('link', linkforce);
        const drawedLinks = this.drawLinks(this.links);
        const drawedNodes = this.drawNodes(this.nodes);
        const drawedLinkTexts = this.drawLinkText(this.links);
        const drawedCircleTexts = this.drawCircleText(this.nodes);
        this.simulation.on('tick', this.ticked.bind(this, drawedLinks, drawedNodes, drawedLinkTexts, drawedCircleTexts));

        d3.selectAll('.circle-1').on('click',(d)=>{
            for(let i=0; i<this.nodes.length; i++){
                d3.select('#circle'+i).attr('class', 'circle-1');
            }
            for(let i=0; i<this.links.length; i++){
                d3.select('#linkpath'+i).attr('class', 'link');
            }
            
            this.links.forEach(l=>{
                if(l.source.n.name===d.n.name||l.target.n.name===d.n.name){
                    d3.select('#linkpath'+l.index).attr('class','link-select');
                    if(l.source.n.type===0){
                        d3.select('#circle'+l.source.index).attr('class', 'circle-select-1');
                    }
                    else {
                        d3.select('#circle'+l.source.index).attr('class', 'circle-select-2');
                    }
                    if(l.target.n.type===0){
                        d3.select('#circle'+l.target.index).attr('class', 'circle-select-1');
                    }
                    else {
                        d3.select('#circle'+l.target.index).attr('class', 'circle-select-2');
                    }
                }
            })
        });
        d3.selectAll('.circle-2').on('click', d=>{
            for(let i=0; i<this.nodes.length; i++){
                d3.select('#circle'+i).attr('class', 'circle-2');
            }
            for(let i=0; i<this.links.length; i++){
                d3.select('#linkpath'+i).attr('class', 'link');
            }
            this.links.forEach(l=>{
                if(l.source.n.name===d.n.name||l.target.n.name===d.n.name){
                    d3.select('#linkpath'+l.index).attr('class','link-select');
                    if(l.source.n.type===0){
                        d3.select('#circle'+l.source.index).attr('class', 'circle-select-1');
                    }
                    else {
                        d3.select('#circle'+l.source.index).attr('class', 'circle-select-2');
                    }
                    if(l.target.n.type===0){
                        d3.select('#circle'+l.target.index).attr('class', 'circle-select-1');
                    }
                    else {
                        d3.select('#circle'+l.target.index).attr('class', 'circle-select-2');
                    }
                   
                }
            });
            
        });
    }

    fillData() {
        var temp_nodes = [];
        var temp_links = [];
        var temp = {};
        this.datas.forEach(function (data) {
            if (!temp[data.source.name]) {
                temp_nodes.push({
                    n: data.source
                });
                temp[data.source.name] = 1;
            }
            if (!temp[data.target.name]) {
                temp_nodes.push({
                    n: data.target
                });
                temp[data.target.name] = 1;
            }
        });
        this.simulation.nodes(temp_nodes);
        temp = {};
        temp_nodes.forEach(function (node) {
            temp[node.n.name] = node.index;
        });
        this.datas.forEach(function (data) {
            temp_links.push({
                source: temp[data.source.name],
                target: temp[data.target.name],
                rela: data.rela
            })
        });
        //simulation.force('link', d3.forceLink(links).distance(180));
        return { nodes: temp_nodes, links: temp_links }

    }

    drawLinks(links) {
        console.log(links)
        return d3.select('svg').append('g').selectAll('.link').data(links).enter().append('path').attr("class", "link")
            .attr("id", function (d, i) {
                return 'linkpath' + i;
            })
            .attr("d", function (d) {
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            });
    }

    drawLinkText(links) {
        const linklabels = d3.select('svg').append("g").selectAll(".linklabel").data(links).enter().append("text").attr("class",
            "linklabel").attr("dx", 65)
            .attr("dy", 0).attr("id", function (d, i) {
                return 'linkpath' + i;
            });
        linklabels.append(
            'textPath').text(function (d) {
                return d.rela;
            }).attr('xlink:href', function (d, i) {
                return '#linkpath' + i
            });
        return linklabels;
    }

    drawCircleText(nodes) {
        return d3.select('svg').append("g").selectAll("circletext").data(nodes).enter().append("text").attr("class","circle-text-style").attr("dy", d=>{
            switch(d.n.type){
                case 0: return ".2em";
                default: return ".3em";
            }
        }).attr("text-anchor", "middle").attr("x", function (d) {
                if (d.n.name.length <= 4) {
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', 2)
                        .text(function () {
                            return d.n.name;
                        });
                } else {
                    var top = d.n.name.substring(0, 4);
                    var bot = d.n.name.substring(4, d.n.name.length);
                    d3.select(this).text(function () {
                        return '';
                    });
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', -7)
                        .text(function () {
                            return top;
                        });
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', 10)
                        .text(function () {
                            return bot;
                        });
                }
            });
    }

    drawNodes(nodes) {
        //const svg = this.state.svg;
        console.log(nodes);
        return d3.select('svg').append("g").selectAll("circle").data(nodes).enter().append("circle").attr("r", d=>{
            switch(d.n.type){
                case 0: return 50;
                default: return 30;
            }
        }).attr("class",  d=>{
            switch(d.n.type){
                case 0: return "circle-1";
                default: return "circle-2";
            }
        }).attr("id", d=>{
            return "circle"+d.index;
        }).call(d3.drag().on("start", this.dragstart.bind(this))
                .on("drag", this.dragmove.bind(this))
                .on("end", this.dragend.bind(this)));
    }
    ticked(drawedLinks, drawedNodes, drawedLinkTexts, drawedCircleTexts) {
        drawedLinks.attr("d", function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        })
        drawedNodes.attr("transform", this.transform);
        drawedCircleTexts.attr("transform", this.transform);
        drawedLinkTexts.attr('transform', function (d, i) {
            if (d.target.x < d.source.x) {
                const bbox = this.getBBox();
                const rx = bbox.x + bbox.width / 2;
                const ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
                return 'rotate(0)';
            }
        });
    }

    transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }

    dragstart() {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }
    dragmove() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }
    dragend() {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

    zoomed() {
        d3.selectAll('g').attr('transform', d3.event.transform);
    }

}
