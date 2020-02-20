package com.datapath.persistence.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@Builder
@AllArgsConstructor
@Table(name = "tender", indexes = {
        @Index(columnList = "release_tender_id", name = "tender_release_tender_id_idx"),
        @Index(columnList = "procedure_type_id", name = "procedure_type_id_idx"),
        @Index(columnList = "date_published", name = "date_published_idx")
})
@ToString(exclude = {"lots", "documents", "procuringEntity", "items", "contracts", "awards", "bids", "procedureType", "relatedProcessesIdentifiers"})
public class Tender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "release_tender_id")
    private Long releaseTenderId;

    @Column(name = "tender_id")
    private String tenderId;

    @Column(name = "holder", columnDefinition = "TEXT")
    private String holder;

    @Column(name = "funds", columnDefinition = "TEXT")
    private String funds;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "procurement_method_details")
    private String procurementMethodDetails;

    @Column(name = "date_published", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime datePublished;

    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime date;

    @Column(name = "status")
    private String status;

    @Column(name = "procurement_method")
    private String procurementMethod;

    @Column(name = "industry")
    private String industry;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "is_competitive")
    private Boolean isCompetitive;

    @Column(name = "currency")
    private String currency;

    @Column(name = "source")
    private String source;

    @Column(name = "origin")
    private String origin;

    @Column(name = "tender_period_start_date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime tenderPeriodStartDate;

    @Column(name = "tender_period_end_date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime tenderPeriodEndDate;

    @Column(name = "date_created", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime dateCreated;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lot> lots;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Document> documents;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enquiry> enquiries;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contract> contracts;

    @OneToMany(mappedBy = "tender", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Award> awards;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bid> bids;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TenderItem> items;

    @OneToOne(mappedBy = "tender", cascade =  {CascadeType.ALL}, orphanRemoval = true)
    private TenderData data;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "procedure_type_id")
    private ProcedureType procedureType;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "procuring_entity_id")
    private Party procuringEntity;

    public Tender(){
        this.awards= new ArrayList<>();
        this.bids= new ArrayList<>();
        this.contracts= new ArrayList<>();
        this.lots= new ArrayList<>();
        this.items= new ArrayList<>();
        this.documents= new ArrayList<>();
        this.enquiries= new ArrayList<>();
    }


}
