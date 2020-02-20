package com.datapath.persistence.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@Table(name = "party", indexes = {
        @Index(columnList = "region", name = "party_region_idx"),
        @Index(columnList = "resident", name = "party_resident_idx"),
        @Index(columnList = "is_capital", name = "party_is_capital_idx")
})
@ToString(exclude = {"contracts", "awards", "bids"})
public class Party {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @Column(name = "outer_id", columnDefinition = "TEXT")
    private String outerId;

    @Column(name = "scheme", columnDefinition = "TEXT")
    private String scheme;

    @Column(name = "scale", columnDefinition = "TEXT")
    private String scale;

    @Column(name = "party", columnDefinition = "TEXT")
    private String party;

    @Column(name = "country", columnDefinition = "TEXT")
    private String country;

    @Column(name = "resident")
    private Boolean resident;

    @Column(name = "locality", columnDefinition = "TEXT")
    private String locality;

    @Column(name = "postal_code", columnDefinition = "TEXT")
    private String postalCode;

    @Column(name = "region", columnDefinition = "TEXT")
    private String region;

    @Column(name = "is_capital")
    private Boolean isCapital;

    @Column(name = "street_address", columnDefinition = "TEXT")
    private String streetAddress;

    @Column(name = "email")
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "url")
    private String url;

    @OneToMany(mappedBy = "winner")
    private List<Award> awards;

    @OneToMany(mappedBy = "supplier")
    private List<Contract> contracts;

    @OneToMany(mappedBy = "tenderer")
    private List<Bid> bids;

    @OneToMany(mappedBy = "procuringEntity")
    private List<Tender> tenders;

    @ManyToOne()
    @JoinColumn(name = "department_id")
    private Department department;

    @Transient
    private Long departmentId;

    public Party(){
        contracts = new ArrayList<>();
        awards = new ArrayList<>();
        bids = new ArrayList<>();
        tenders = new ArrayList<>();
    }



}
